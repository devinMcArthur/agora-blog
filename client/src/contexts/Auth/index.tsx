import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { useImmerReducer } from "use-immer";

import {
  FullUserSnippetFragment,
  useCurrentUserLazyQuery,
} from "../../generated/graphql";
import useStorage from "../../hooks/useStorage";
import SignIn from "./views/SignIn";
import VerificationModal from "./views/Verification";

/**
 * ----- Types -----
 */

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthState {
  user: FullUserSnippetFragment | undefined | null;
}

interface IAuthContext {
  state: IAuthState;

  login: (jwt: string) => void;
  logout: () => void;
  openSignInModal: () => void;
  requiresVerification: (callback: () => void) => void;
}

type IAuthAction =
  | {
      type: "deauthorize-session";
    }
  | {
      type: "authorize-session";
      payload: {
        user: FullUserSnippetFragment;
      };
    }
  | {
      type: "session-loading";
    };

/**
 * ----- Initialize Variables -----
 */

export const localStorageTokenKey = "token";

const initialState: IAuthState = {
  user: undefined,
};

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);

/**
 * ----- Reducer -----
 */

const AuthReducer = (draft: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case "authorize-session": {
      return {
        user: action.payload.user,
      };
    }
    case "deauthorize-session": {
      return {
        user: null,
      };
    }
    case "session-loading": {
      return {
        user: undefined,
      };
    }
  }
};

/**
 * ----- Provider -----
 */

const AuthProvider = ({ children }: IAuthProvider) => {
  const [state, dispatch] = useImmerReducer(AuthReducer, initialState);

  const { getItem, setItem, removeItem } = useStorage();

  /**
   * ----- State Inititalization -----
   */

  const [token, setToken] = React.useState(
    getItem(localStorageTokenKey) || null
  );

  const [verificationCallback, setVerificationCallback] =
    React.useState<() => void>();

  /**
   * ----- Hook Initialization -----
   */

  const [
    currentUser,
    {
      data: currentUserData,
      loading: currentUserLoading,
      error: currentUserError,
      networkStatus: currentUserNetworkStatus,
      refetch: currentUserRefetch,
    },
  ] = useCurrentUserLazyQuery({ notifyOnNetworkStatusChange: true });

  const {
    isOpen: signInModalOpen,
    onOpen: onSignInModalOpen,
    onClose: onSignInModalClose,
  } = useDisclosure();

  const {
    isOpen: verificationModalOpen,
    onOpen: onVerificationModalOpen,
    onClose: onVerificationModalClose,
  } = useDisclosure();

  /**
   * ----- Functions -----
   */

  const requiresVerification = React.useCallback(
    (callback: () => void) => {
      setVerificationCallback(undefined);

      if (!state.user) {
        setVerificationCallback(() => callback);
        onSignInModalOpen();
      } else if (!state.user?.verified) {
        setVerificationCallback(() => callback);
        onVerificationModalOpen();
      } else if (state.user.verified) {
        callback();
      }
    },
    [onSignInModalOpen, onVerificationModalOpen, state.user]
  );

  const login: IAuthContext["login"] = React.useCallback((jwt) => {
    setToken(jwt);
  }, []);

  const logout: IAuthContext["logout"] = React.useCallback(
    () => setToken(null),
    []
  );

  const authorizeSession = React.useCallback(
    (user: FullUserSnippetFragment) => {
      dispatch({
        type: "authorize-session",
        payload: {
          user,
        },
      });
    },
    [dispatch]
  );

  const sessionLoading = React.useCallback(() => {
    dispatch({
      type: "session-loading",
    });
  }, [dispatch]);

  const deauthorizeSession = React.useCallback(() => {
    setToken(null);
    dispatch({
      type: "deauthorize-session",
    });
  }, [dispatch]);

  const fetchUser = React.useCallback(() => {
    if (currentUserRefetch) {
      currentUserRefetch();
    } else {
      currentUser();
    }
  }, [currentUser, currentUserRefetch]);

  /**
   * ----- Use-effects and other logic -----
   */

  // Handle currentUserQuery
  React.useEffect(() => {
    if (currentUserData?.currentUser && !currentUserLoading)
      authorizeSession(currentUserData.currentUser);
    else if (currentUserLoading) sessionLoading();
    else if (!currentUserLoading && currentUserError) deauthorizeSession();
  }, [
    currentUserData,
    currentUserLoading,
    currentUserError,
    currentUserNetworkStatus,
    authorizeSession,
    sessionLoading,
    deauthorizeSession,
  ]);

  // try and call verification callback once authorized
  React.useEffect(() => {
    if (!!verificationCallback && state.user)
      requiresVerification(verificationCallback);
    // only trigger when state.user is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  // Handle token changes
  React.useEffect(() => {
    const localStorageToken = getItem(localStorageTokenKey);
    if (token && localStorageToken && !state.user) {
      fetchUser();
    } else if (token && !localStorageToken) {
      setItem(localStorageTokenKey, token);
      if (!state.user) fetchUser();
    } else if (!token && localStorageToken) {
      removeItem(localStorageTokenKey);
      deauthorizeSession();
    } else if (!token && !localStorageToken) {
      deauthorizeSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deauthorizeSession, state.user, token]);

  // Close sign in modal if logged in
  React.useEffect(() => {
    if (state.user) onSignInModalClose();
  }, [onSignInModalClose, state.user]);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        openSignInModal: onSignInModalOpen,
        requiresVerification,
      }}
    >
      <SignIn isOpen={signInModalOpen} close={onSignInModalClose} />
      <VerificationModal
        isOpen={verificationModalOpen}
        close={onVerificationModalClose}
      />
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined)
    throw new Error(
      "useAuth can only be used in a component wrapped by AuthProvider"
    );

  return context;
};

export { AuthProvider, useAuth };

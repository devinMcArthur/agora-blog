import React from "react";
import { useImmerReducer } from "use-immer";

import {
  FullUserSnippetFragment,
  useCurrentUserLazyQuery,
} from "../../generated/graphql";

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

  /**
   * ----- State Inititalization -----
   */

  const [token, setToken] = React.useState(
    localStorage.getItem(localStorageTokenKey)
  );

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

  /**
   * ----- Functions -----
   */

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

  // Handle token changes
  React.useEffect(() => {
    const localStorageToken = localStorage.getItem(localStorageTokenKey);
    if (token && localStorageToken && !state.user) {
      fetchUser();
    } else if (token && !localStorageToken) {
      localStorage.setItem(localStorageTokenKey, token);
      if (!state.user) fetchUser();
    } else if (!token && localStorageToken) {
      localStorage.removeItem(localStorageTokenKey);
      deauthorizeSession();
    } else if (!token && !localStorageToken) {
      deauthorizeSession();
    }
  }, [fetchUser, deauthorizeSession, state.user, token]);

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
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

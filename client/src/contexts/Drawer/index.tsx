import React from "react";
import { useImmerReducer } from "use-immer";
import {
  FullParagraphStatementSnippetFragment,
  ParagraphEditProposalStatementSnippetFragment,
} from "../../generated/graphql";

/**
 * ----- Types -----
 */

interface IDrawerProvider {
  children: React.ReactNode;
}

interface IDrawerState {
  type?: "PARAGRAPH-STATEMENT" | "EDIT-PROPOSAL-STATEMENT";
  paragraphStatement?: FullParagraphStatementSnippetFragment;
  editProposalStatement?: ParagraphEditProposalStatementSnippetFragment;
  currentPageId?: string;
}

interface IDrawerContext {
  state: IDrawerState;
  isActive: boolean;

  setParagraphStatement: (
    statement: FullParagraphStatementSnippetFragment
  ) => void;
  clearParagraphStatement: () => void;
  setEditProposalStatement: (
    statement: ParagraphEditProposalStatementSnippetFragment
  ) => void;
  clearEditProposalStatement: () => void;
  setCurrentPage: (currentPageId: string) => void;
  clearState: () => void;
}

type IDrawerAction =
  | {
      type: "set-paragraph-statement";
      payload: {
        paragraphStatement: FullParagraphStatementSnippetFragment;
      };
    }
  | {
      type: "clear-paragraph-statement";
    }
  | {
      type: "set-edit-proposal-statement";
      payload: {
        editProposalStatement: ParagraphEditProposalStatementSnippetFragment;
      };
    }
  | {
      type: "clear-edit-proposal-statement";
    }
  | {
      type: "set-current-page";
      payload: {
        currentPageId: string;
      };
    }
  | {
      type: "clear";
    };

const initialState: IDrawerState = {
  type: undefined,
  paragraphStatement: undefined,
  currentPageId: undefined,
  editProposalStatement: undefined,
};

const DrawerContext = React.createContext<IDrawerContext | undefined>(
  undefined
);

/**
 * ----- Reducer -----
 */

const DrawerReducer = (
  draft: IDrawerState,
  action: IDrawerAction
): IDrawerState => {
  switch (action.type) {
    case "clear": {
      return initialState;
    }
    case "set-paragraph-statement": {
      return {
        ...draft,
        type: "PARAGRAPH-STATEMENT",
        editProposalStatement: undefined,
        paragraphStatement: action.payload.paragraphStatement,
      };
    }
    case "clear-paragraph-statement": {
      return {
        ...draft,
        type: undefined,
        paragraphStatement: undefined,
      };
    }
    case "set-edit-proposal-statement": {
      return {
        ...draft,
        type: "EDIT-PROPOSAL-STATEMENT",
        paragraphStatement: undefined,
        editProposalStatement: action.payload.editProposalStatement,
      };
    }
    case "clear-edit-proposal-statement": {
      return {
        ...draft,
        type: undefined,
        editProposalStatement: undefined,
      };
    }
    case "set-current-page": {
      return {
        currentPageId: action.payload.currentPageId,
      };
    }
  }
};

/**
 * ----- Provider -----
 */

const DrawerProvider = ({ children }: IDrawerProvider) => {
  const [state, dispatch] = useImmerReducer(DrawerReducer, initialState);

  const [isActive, setIsActive] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const setParagraphStatement: IDrawerContext["setParagraphStatement"] =
    React.useCallback(
      (paragraphStatement) => {
        dispatch({
          type: "set-paragraph-statement",
          payload: {
            paragraphStatement,
          },
        });
      },
      [dispatch]
    );

  const clearParagraphStatement: IDrawerContext["clearParagraphStatement"] =
    React.useCallback(() => {
      dispatch({
        type: "clear-paragraph-statement",
      });
    }, [dispatch]);

  const setEditProposalStatement: IDrawerContext["setEditProposalStatement"] =
    React.useCallback(
      (editProposalStatement) => {
        dispatch({
          type: "set-edit-proposal-statement",
          payload: {
            editProposalStatement,
          },
        });
      },
      [dispatch]
    );

  const clearEditProposalStatement: IDrawerContext["clearEditProposalStatement"] =
    React.useCallback(() => {
      dispatch({
        type: "clear-edit-proposal-statement",
      });
    }, [dispatch]);

  const setCurrentPage: IDrawerContext["setCurrentPage"] = React.useCallback(
    (currentPageId) => {
      dispatch({
        type: "set-current-page",
        payload: {
          currentPageId,
        },
      });
    },
    [dispatch]
  );

  const clearState: IDrawerContext["clearState"] = React.useCallback(() => {
    dispatch({
      type: "clear",
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (!!state.type) setIsActive(true);
    else setIsActive(false);
  }, [state.type]);

  return (
    <DrawerContext.Provider
      value={{
        state,
        isActive,
        setParagraphStatement,
        clearParagraphStatement,
        setEditProposalStatement,
        clearEditProposalStatement,
        setCurrentPage,
        clearState,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = () => {
  const context = React.useContext(DrawerContext);

  if (context === undefined)
    throw new Error(
      "useDrawer can only be used in a component wrapped by DrawerProvider"
    );

  return context;
};

export { DrawerProvider, useDrawer };

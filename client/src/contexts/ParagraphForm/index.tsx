import React from "react";
import { useImmerReducer } from "use-immer";
import {
  DisplayStatementSnippetFragment,
  FullStringArraySnippetFragment,
  usePageQuery,
} from "../../generated/graphql";
import { getParentSpanFromSelection } from "./utils";

/**
 * ----- Type Initialization -----
 */

interface IParagraphFormProvider {
  pageId: string;
  children: React.ReactNode;
}

interface IState {
  statements: DisplayStatementSnippetFragment[] | null | undefined;
}

interface IParagraphFormContext {
  state: IState;

  handleStatementChange: (statementId: string, element: HTMLElement) => void;
}

type IAction =
  | {
      type: "initialize";
      payload: { statements: DisplayStatementSnippetFragment[] };
    }
  | {
      type: "update-statement-string";
      payload: {
        statementId: string;
        stringArrayIndex: number;
        newString: string;
      };
    };

/**
 * ----- Variable Initialization -----
 */

const initialState: IState = {
  statements: undefined,
};

const ParagraphFormContext = React.createContext<
  IParagraphFormContext | undefined
>(undefined);

/**
 * ----- Reducer ------
 */

const ParagraphFormReducer = (draft: IState, action: IAction): IState => {
  const updateStatementStringArray = (
    statementId: string,
    stringArrayIndex: number,
    newStringArray: Partial<FullStringArraySnippetFragment>
  ) => {
    if (draft.statements) {
      const statement = draft.statements.find(
        (statement) => statement._id === statementId
      );

      if (statement) {
        statement.versions[0].stringArray[stringArrayIndex] = {
          ...statement.versions[0].stringArray[stringArrayIndex],
          ...newStringArray,
        };
      } else console.warn("Unable to find statement with that Id");
    } else console.warn("No statements in state");
  };

  switch (action.type) {
    case "initialize": {
      return {
        ...draft,
        statements: action.payload.statements,
      };
    }
    case "update-statement-string": {
      updateStatementStringArray(
        action.payload.statementId,
        action.payload.stringArrayIndex,
        { string: action.payload.newString }
      );

      return draft;
    }
  }
};

/**
 * ----- Provider -----
 */

const ParagraphFormProvider = ({
  children,
  pageId,
}: IParagraphFormProvider) => {
  const [state, dispatch] = useImmerReducer(ParagraphFormReducer, initialState);

  console.log("statements", state.statements);

  /**
   * ----- GraphQL Calls -----
   */

  const { data: pageData, loading: pageLoading } = usePageQuery({
    variables: { id: pageId },
  });

  /**
   * ----- Functions ------
   */

  const handleStatementChange: IParagraphFormContext["handleStatementChange"] =
    (statementId, element) => {
      const selectionParent = getSelectionParent();

      if (selectionParent && selectionParent.id) {
        const selection = document.getSelection();

        if (
          selection &&
          selection.anchorNode &&
          selection.anchorOffset &&
          selection.focusNode &&
          selection.focusOffset
        ) {
          const range = document.createRange();
          const anchorNode = selection.anchorNode,
            anchorOffset = Number(selection.anchorOffset),
            focusNode = selection.focusNode,
            focusOffset = Number(selection.focusOffset);
          range.setStart(anchorNode, anchorOffset);
          range.setEnd(focusNode, focusOffset);

          console.log("range1", range);
          console.log("anchorOffest", { anchorOffset });

          updateStringArrayString(
            statementId,
            Number(selectionParent.id),
            selectionParent.innerText
          );

          console.log("range2", range);

          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else console.warn("Unable to find statement id from element");
    };

  const updateStringArrayString = (
    statementId: string,
    stringArrayIndex: number,
    string: string
  ) => {
    dispatch({
      type: "update-statement-string",
      payload: {
        newString: string,
        statementId,
        stringArrayIndex,
      },
    });
  };

  const getSelectionParent = () => {
    const selection = document.getSelection();

    console.log("selection", selection);

    return getParentSpanFromSelection(selection);
  };

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!pageLoading && pageData?.page?.currentParagraph) {
      dispatch({
        type: "initialize",
        payload: { statements: pageData.page.currentParagraph.statements },
      });
    }
  }, [pageData, pageLoading, dispatch]);

  // document.onselectionchange = () => {
  //   const parentNode = getSelectionParent();
  //   console.log("parent", parentNode?.innerText);
  // };

  return (
    <ParagraphFormContext.Provider value={{ state, handleStatementChange }}>
      {children}
    </ParagraphFormContext.Provider>
  );
};

/**
 * ----- Context Hook -----
 */

const useParagraphForm = () => {
  const context = React.useContext(ParagraphFormContext);

  if (context === undefined) {
    throw new Error(
      "useParagraphForm can only be used in a component wrapped by ParagraphFormProvider"
    );
  }

  return context;
};

export { ParagraphFormProvider, useParagraphForm };

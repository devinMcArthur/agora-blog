import React from "react";
import { BaseEditor, BaseSelection, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { useImmerReducer } from "use-immer";
import {
  DisplayParagraphSnippetFragment,
  usePageQuery,
} from "../../generated/graphql";
import {
  StyledText,
  CustomElements,
  StatementElementType,
} from "../../models/slate";
import { convertParagraphToSlate } from "./utils";

/**
 * ----- Type Initialization -----
 */

/**
 * Slate Types
 */

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElements;
    Text: StyledText;
  }
}

/**
 * Context Types
 */

interface IParagraphFormProvider {
  pageId: string;
  children: React.ReactNode;
}

interface IState {
  paragraph: DisplayParagraphSnippetFragment | null | undefined;
  previousSlateParagraph: Descendant[] | null | undefined;
  slateParagraph: Descendant[] | null | undefined;
}

interface IParagraphFormContext {
  state: IState;
  savedSelection?: { slateSelection: BaseSelection; domRange: Range };

  updateSlateStatement: (slateStatement: Descendant, index: number) => void;
  updateSlateParagraph: (slateParagraph: Descendant[]) => void;
  saveSelection: (selection: BaseSelection) => void;
  clearSelection: () => void;
  restoreDomSelection: () => void;
}

type IAction =
  | {
      type: "initialize";
      payload: {
        paragraph: DisplayParagraphSnippetFragment;
        slateParagraph: Descendant[];
      };
    }
  | {
      type: "update-slate-paragraph";
      payload: {
        slateParagraph: Descendant[];
      };
    }
  | {
      type: "update-slate-statement";
      payload: {
        slateStatement: Descendant;
        index: number;
      };
    };

/**
 * ----- Variable Initialization -----
 */

const initialState: IState = {
  paragraph: undefined,
  slateParagraph: undefined,
  previousSlateParagraph: undefined,
};

const ParagraphFormContext = React.createContext<
  IParagraphFormContext | undefined
>(undefined);

/**
 * ----- Reducer ------
 */

const ParagraphFormReducer = (draft: IState, action: IAction): IState => {
  switch (action.type) {
    case "initialize": {
      return {
        ...draft,
        paragraph: action.payload.paragraph,
        slateParagraph: action.payload.slateParagraph,
        previousSlateParagraph: action.payload.slateParagraph,
      };
    }
    case "update-slate-paragraph": {
      const slateParagraph: Descendant[] = JSON.parse(
        JSON.stringify(action.payload.slateParagraph)
      );
      console.log("slateParagraph", slateParagraph);
      const previousSlateParagraph = draft.previousSlateParagraph;

      // A statement has been added or removed
      if (
        previousSlateParagraph &&
        previousSlateParagraph?.length !== slateParagraph.length
      ) {
        // Ensure all children of paragraph of statements
        for (let i = 0; i < slateParagraph.length; i++) {
          if (
            !(slateParagraph[i] as CustomElements).type ||
            (slateParagraph[i] as CustomElements).type !== "statement"
          )
            return draft;
        }

        // Create a map of all statement Ids
        const statementIds = slateParagraph.map(
          (statement) => (statement as StatementElementType).statementId
        );

        // Ensure any duplicate statement Ids are marked as NEW
        const seenIds: string[] = [];
        for (let i = 0; i < statementIds.length; i++) {
          console.log("seenIds", seenIds);
          console.log("id", statementIds[i]);
          if (seenIds.includes(statementIds[i]))
            (slateParagraph[i] as StatementElementType).statementId = "NEW";

          // Add to seenIds array after
          if (statementIds[i] !== "NEW") seenIds.push(statementIds[i]);

          (slateParagraph[i] as StatementElementType).index = i;
        }

        console.log("mutatedSlateParagraph", slateParagraph);
      }

      return {
        ...draft,
        slateParagraph,
        previousSlateParagraph: draft.slateParagraph,
      };
    }
    case "update-slate-statement": {
      const { slateStatement, index } = action.payload;
      if (draft.slateParagraph && !!draft.slateParagraph[index]) {
        draft.slateParagraph[index] = slateStatement;
      }
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
  const [savedSelection, setSavedSelection] =
    React.useState<IParagraphFormContext["savedSelection"]>();

  /**
   * ----- GraphQL Calls -----
   */

  const { data: pageData, loading: pageLoading } = usePageQuery({
    variables: { id: pageId },
  });

  /**
   * ----- Functions ------
   */

  const updateSlateParagraph = (slateParagraph: Descendant[]) => {
    dispatch({
      type: "update-slate-paragraph",
      payload: {
        slateParagraph,
      },
    });
  };

  const updateSlateStatement: IParagraphFormContext["updateSlateStatement"] = (
    slateStatement,
    index
  ) => {
    dispatch({
      type: "update-slate-statement",
      payload: {
        slateStatement,
        index,
      },
    });
  };

  const saveSelection: IParagraphFormContext["saveSelection"] = (selection) => {
    const sel = window.getSelection();
    if (sel && sel.getRangeAt(0) && sel?.rangeCount) {
      setSavedSelection({
        slateSelection: selection,
        domRange: sel.getRangeAt(0),
      });
    } else throw new Error("Unable to save dom selection");
  };

  const restoreDomSelection: IParagraphFormContext["restoreDomSelection"] =
    () => {
      if (savedSelection?.domRange) {
        if (window.getSelection()) {
          var sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(savedSelection.domRange);
        }
      }
    };

  const clearSelection: IParagraphFormContext["clearSelection"] = () =>
    setSavedSelection(undefined);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!pageLoading && pageData?.page?.currentParagraph) {
      dispatch({
        type: "initialize",
        payload: {
          paragraph: pageData.page.currentParagraph,
          slateParagraph: convertParagraphToSlate(
            pageData.page.currentParagraph
          ),
        },
      });
    }
  }, [pageData, pageLoading, dispatch]);

  return (
    <ParagraphFormContext.Provider
      value={{
        state,
        savedSelection,
        updateSlateParagraph,
        updateSlateStatement,
        saveSelection,
        clearSelection,
        restoreDomSelection,
      }}
    >
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

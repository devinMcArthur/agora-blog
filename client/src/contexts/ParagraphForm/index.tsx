import React from "react";
import { BaseEditor, Descendant } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { useImmerReducer } from "use-immer";
import {
  DisplayParagraphSnippetFragment,
  usePageQuery,
} from "../../generated/graphql";
import { SlateLeaf, SlateStatementElement } from "../../models/slate";
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
    Element: SlateStatementElement;
    Text: SlateLeaf;
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
  slateParagraph: Descendant[] | null | undefined;
}

interface IParagraphFormContext {
  state: IState;

  updateSlateParagraph: (slateParagraph: Descendant[]) => void;
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
    };

/**
 * ----- Variable Initialization -----
 */

const initialState: IState = {
  paragraph: undefined,
  slateParagraph: undefined,
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
      };
    }
    case "update-slate-paragraph": {
      return {
        ...draft,
        slateParagraph: action.payload.slateParagraph,
      };
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
    <ParagraphFormContext.Provider value={{ state, updateSlateParagraph }}>
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

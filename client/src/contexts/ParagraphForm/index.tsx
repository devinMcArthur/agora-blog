import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Descendant } from "slate";
import { useImmerReducer } from "use-immer";

import {
  DisplayParagraphSnippetFragment,
  NewStatementData,
  usePageQuery,
} from "../../generated/graphql";
import {
  CustomElements,
  StatementElementContentType,
  StatementElementType,
} from "../../models/slate";
import {
  convertParagraphToSlate,
  convertSlateParagraphToParagraph,
  convertSlateParagraphToStatementData,
} from "./utils";

/**
 * ----- Type Initialization -----
 */

/**
 * Context Types
 */

export interface IParagraphFormProvider {
  pageId?: string;
  children: React.ReactNode;

  onChange?: (state: IParagraphFormState) => void;
}

export interface IParagraphFormState {
  type: "EDIT" | "NEW";
  originalParagraph: DisplayParagraphSnippetFragment | null | undefined;
  paragraph: DisplayParagraphSnippetFragment | null | undefined;
  previousSlateParagraph: Descendant[] | null | undefined;
  slateParagraph: Descendant[] | null | undefined;
  statements: NewStatementData[] | null | undefined;
}

export interface IParagraphFormContext {
  state: IParagraphFormState;

  updateSlateStatement: (value: Descendant[], index: number) => void;
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
      type: "initialize-blank";
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
        value: Descendant[];
        index: number;
      };
    }
  | {
      type: "update-paragraph";
      payload: {
        paragraph: DisplayParagraphSnippetFragment;
      };
    }
  | {
      type: "update-statements";
      payload: {
        statements: NewStatementData[];
      };
    };

/**
 * ----- Variable Initialization -----
 */

const initialState: IParagraphFormState = {
  type: "EDIT",
  originalParagraph: undefined,
  paragraph: undefined,
  slateParagraph: undefined,
  previousSlateParagraph: undefined,
  statements: undefined,
};

const ParagraphFormContext = React.createContext<
  IParagraphFormContext | undefined
>(undefined);

/**
 * ----- Reducer ------
 */

const ParagraphFormReducer = (
  draft: IParagraphFormState,
  action: IAction
): IParagraphFormState => {
  switch (action.type) {
    case "initialize": {
      return {
        ...draft,
        type: "EDIT",
        originalParagraph: action.payload.paragraph,
        paragraph: action.payload.paragraph,
        slateParagraph: action.payload.slateParagraph,
        previousSlateParagraph: action.payload.slateParagraph,
      };
    }
    case "initialize-blank": {
      const blankSlateParagraph: Descendant[] = [
        {
          type: "statement",
          statementId: `NEW-${uuidv4()}`,
          index: 0,
          questions: [],
          newQuestions: [],
          children: [{ text: "" }],
        },
      ];

      return {
        ...draft,
        type: "NEW",
        slateParagraph: blankSlateParagraph,
      };
    }
    case "update-slate-paragraph": {
      const slateParagraph: Descendant[] = JSON.parse(
        JSON.stringify(action.payload.slateParagraph)
      );
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
          if (seenIds.includes(statementIds[i])) {
            (
              slateParagraph[i] as StatementElementType
            ).statementId = `NEW-${uuidv4()}`;
            (slateParagraph[i] as StatementElementType).newQuestions = [];
            (slateParagraph[i] as StatementElementType).questions = [];
          }

          (slateParagraph[i] as StatementElementType).index = i;

          seenIds.push(statementIds[i]);
        }
      }

      return {
        ...draft,
        slateParagraph: slateParagraph.map((statement, index) => {
          return {
            ...statement,
            index,
          };
        }),
        previousSlateParagraph: draft.slateParagraph,
      };
    }
    case "update-slate-statement": {
      const { value, index } = action.payload;
      if (draft.slateParagraph && !!draft.slateParagraph[index]) {
        (draft.slateParagraph[index] as StatementElementType).children = (
          value[0] as StatementElementContentType
        ).children;
      }
      return draft;
    }
    case "update-paragraph": {
      return {
        ...draft,
        paragraph: action.payload.paragraph,
      };
    }
    case "update-statements": {
      return {
        ...draft,
        statements: action.payload.statements,
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
  onChange,
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

  const updateSlateStatement: IParagraphFormContext["updateSlateStatement"] = (
    value,
    index
  ) => {
    dispatch({
      type: "update-slate-statement",
      payload: {
        value,
        index,
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

  React.useEffect(() => {
    if (state.slateParagraph && state.originalParagraph)
      dispatch({
        type: "update-paragraph",
        payload: {
          paragraph: convertSlateParagraphToParagraph(
            state.slateParagraph,
            state.originalParagraph
          ),
        },
      });
    else if (state.slateParagraph && state.type === "NEW")
      dispatch({
        type: "update-statements",
        payload: {
          statements: convertSlateParagraphToStatementData(
            state.slateParagraph
          ),
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.slateParagraph]);

  React.useEffect(() => {
    if (!pageId) {
      dispatch({
        type: "initialize-blank",
      });
    }
  }, [dispatch, pageId]);

  React.useEffect(() => {
    if (onChange) onChange(state);
  }, [onChange, state]);

  return (
    <ParagraphFormContext.Provider
      value={{
        state,

        updateSlateParagraph,
        updateSlateStatement,
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

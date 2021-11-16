import React from "react";

import { InputProps } from "@chakra-ui/input";
import { StackProps } from "@chakra-ui/layout";
import TextDropdown, { IGroupedOptions } from "./TextDropdown";
import {
  LinkFormPageSnippetFragment,
  QuestionSearchSnippetFragment,
  useLinkFormPageSearchLazyQuery,
  useSearchQuestionsLazyQuery,
  useSearchVariablesLazyQuery,
  VariableSearchSnippetFragment,
} from "../../generated/graphql";
import { useHistory } from "react-router";

interface IItems {
  pages: LinkFormPageSnippetFragment[];
  questions: QuestionSearchSnippetFragment[];
  variables: VariableSearchSnippetFragment[];
}

interface IExtraData {
  type: "page" | "variable" | "question";
  slug?: string;
}

interface IGeneralSearch extends Omit<InputProps, "onChange"> {
  itemSelected: (item: {
    type: "page" | "variable" | "question";
    page?: { id: string; title: string; slug: string };
    question?: { id: string; question: string };
    variable?: { id: string };
  }) => void;
  onChange?: (value: string) => void;
  handleSubmit?: (string: string) => void;
  dropdownId?: string;
  dropdownProps?: StackProps;
  errorMessage?: string;
}

const initialFoundItemsState: IItems = {
  pages: [],
  questions: [],
  variables: [],
};

const limit = 5;

const GeneralSearch = ({
  onChange,
  handleSubmit,
  ...props
}: IGeneralSearch) => {
  /**
   * ----- Hook Initialization -----
   */
  const [foundItems, setFoundItems] = React.useState(initialFoundItemsState);
  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || props.value?.toString() || ""
  );
  const [searchTimeout, setSearchTimeout] = React.useState<number>();

  const [searchPages, { data: pagesData, loading: pagesLoading }] =
    useLinkFormPageSearchLazyQuery();
  const [searchQuestions, { data: questionsData, loading: questionsLoading }] =
    useSearchQuestionsLazyQuery();
  const [searchVariables, { data: variablesData, loading: variablesLoading }] =
    useSearchVariablesLazyQuery();

  const history = useHistory();

  /**
   * ----- Functions -----
   */

  const handleChange = (value: string) => {
    setSearchString(value);
    clearTimeout(searchTimeout);
    if (value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          setFoundItems(initialFoundItemsState);

          searchPages({
            variables: { searchString, limit },
          });

          searchQuestions({
            variables: { searchString, limit },
          });

          searchVariables({
            variables: { searchString, limit },
          });
        }, 500)
      );
    } else setFoundItems(initialFoundItemsState);
    if (onChange) onChange(value);
  };

  const handleOptionSelection = (
    value: { value: string; label: string },
    extraData: IExtraData
  ) => {
    if (!extraData) {
      console.warn("Internal Error: no extra data found");
      return;
    }

    switch (extraData.type) {
      case "page": {
        history.push(`/p/${extraData.slug!}`);
        break;
      }
      case "question": {
        history.push(`/q/${value.value}`);
        break;
      }
      case "variable": {
        history.push(`/v/${value.value}`);
        break;
      }
    }
  };

  /**
   * ----- Variables -----
   */

  const groupedOptions: IGroupedOptions<IExtraData> = React.useMemo(() => {
    return {
      pages: foundItems.pages.map((page) => {
        return {
          label: page.title,
          value: page._id,
          extraData: { slug: page.slug, type: "page" },
        };
      }),
      variables: foundItems.variables.map((variable) => {
        return {
          label: variable.title,
          value: variable._id,
          extraData: { type: "variable" },
        };
      }),
      questions: foundItems.questions.map((question) => {
        return {
          label: question.question,
          value: question._id,
          extraData: { type: "question" },
        };
      }),
    };
  }, [foundItems]);

  /**
   * ----- Use-effects and other logic -----
   */

  // Handle pages
  React.useEffect(() => {
    if (!pagesLoading && pagesData) {
      setFoundItems({
        ...foundItems,
        pages: pagesData.searchPages,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesLoading, pagesData]);

  // Handle questions
  React.useEffect(() => {
    if (!questionsLoading && questionsData) {
      setFoundItems({
        ...foundItems,
        questions: questionsData.searchQuestions,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsLoading, questionsData]);

  // Handle variables
  React.useEffect(() => {
    if (!variablesLoading && variablesData) {
      setFoundItems({
        ...foundItems,
        variables: variablesData.searchVariables,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variablesLoading, variablesData]);

  /**
   * ----- Rendering -----
   */

  return (
    <TextDropdown
      onChange={(e) => handleChange(e.target.value)}
      value={searchString}
      groupedOptions={groupedOptions}
      onOptionSelection={(value, extraData) =>
        handleOptionSelection(value, extraData!)
      }
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      selectOptionsWithEnter
      {...props}
    />
  );
};

export default GeneralSearch;

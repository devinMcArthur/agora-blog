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
  itemSelected: (
    value: { value: string; label: string },
    extraData: IExtraData
  ) => void;
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
  itemSelected,
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
  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [searchPages, { data: pagesData, loading: pagesLoading }] =
    useLinkFormPageSearchLazyQuery();
  const [searchQuestions, { data: questionsData, loading: questionsLoading }] =
    useSearchQuestionsLazyQuery();
  const [searchVariables, { data: variablesData, loading: variablesLoading }] =
    useSearchVariablesLazyQuery();

  /**
   * ----- Functions -----
   */

  const handleChange = (value: string) => {
    setSearchString(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    if (value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          setFoundItems(initialFoundItemsState);

          searchPages({
            variables: { searchString: value, limit },
          });

          searchQuestions({
            variables: { searchString: value, limit },
          });

          searchVariables({
            variables: { searchString: value, limit },
          });
        }, 500)
      );
    } else setFoundItems(initialFoundItemsState);
    if (onChange) onChange(value);
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
          extraData: { type: "question", slug: question.slug },
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
      onOptionSelection={(value, extraData) => itemSelected(value, extraData!)}
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      selectOptionsWithEnter
      {...props}
    />
  );
};

export default GeneralSearch;

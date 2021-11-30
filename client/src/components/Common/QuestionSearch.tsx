import React from "react";

import {
  QuestionSearchSnippetFragment,
  useSearchQuestionsLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "./TextDropdown";
import { FiSearch } from "react-icons/fi";
import { BoxProps } from "@chakra-ui/layout";
import { ITextField } from "./TextField";

interface IQuestionSearch extends ITextField {
  questionSelected: (question: { _id: string; question: string }) => void;
  handleSubmit?: (question: string) => void;
  dropdownProps?: BoxProps;
}

const QuestionSearch = ({
  questionSelected,
  handleSubmit,
  dropdownProps,
  inputRightElement = <FiSearch />,
  ...props
}: IQuestionSearch) => {
  const [foundQuestions, setFoundQuestions] = React.useState<
    QuestionSearchSnippetFragment[]
  >([]);
  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );
  const [searchTimeout, setSearchTimeout] = React.useState<NodeJS.Timeout>();

  const [search, { loading, data }] = useSearchQuestionsLazyQuery();

  /**
   * ----- Functions -----
   */

  const handleChange = (value: string) => {
    setSearchString(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    if (value !== "") {
      setSearchTimeout(
        setTimeout(() => {
          search({ variables: { searchString: value } });
        }, 500)
      );
    } else setFoundQuestions([]);
  };

  /**
   * ----- Variables -----
   */

  const options = React.useMemo(() => {
    return foundQuestions.map((question) => {
      return {
        label: question.question,
        value: question._id,
      };
    });
  }, [foundQuestions]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!loading && data) {
      setFoundQuestions(data.searchQuestions);
    }
  }, [loading, data]);

  return (
    <TextDropdown
      onChange={(e) => handleChange(e.target.value)}
      value={searchString}
      inputRightElement={inputRightElement}
      options={options}
      placeholder="Search Questions"
      onOptionSelection={(value) => {
        setSearchString(value.label);
        questionSelected({ _id: value.value, question: value.label });
        setFoundQuestions([]);
      }}
      handleSubmit={() => {
        if (handleSubmit) handleSubmit(searchString);
      }}
      dropdownProps={dropdownProps}
      autoComplete="off"
      {...props}
    />
  );
};

export default QuestionSearch;

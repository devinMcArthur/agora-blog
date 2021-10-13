import React from "react";

import { InputProps } from "@chakra-ui/input";
import {
  QuestionSearchSnippetFragment,
  useSearchQuestionsLazyQuery,
} from "../../generated/graphql";
import TextDropdown from "./TextDropdown";
import { FiSearch } from "react-icons/fi";

interface IQuestionSearch extends InputProps {
  questionSelected: (question: { _id: string; question: string }) => void;
  handleSubmit?: (question: string) => void;
}

const QuestionSearch = ({
  questionSelected,
  handleSubmit,
  ...props
}: IQuestionSearch) => {
  const [foundQuestions, setFoundQuestions] = React.useState<
    QuestionSearchSnippetFragment[]
  >([]);
  const [searchString, setSearchString] = React.useState(
    props.defaultValue?.toString() || ""
  );
  const [searchTimeout, setSearchTimeout] = React.useState<number>();

  const [search, { loading, data }] = useSearchQuestionsLazyQuery();

  /**
   * ----- Functions -----
   */

  const handleChange = (value: string) => {
    setSearchString(value);
    clearTimeout(searchTimeout);
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (handleSubmit) handleSubmit(searchString);
      }}
    >
      <TextDropdown
        onChange={(e) => handleChange(e.target.value)}
        value={searchString}
        inputRightElement={<FiSearch />}
        options={options}
        placeholder="Search Questions"
        onOptionSelection={(value) => {
          setSearchString(value.label);
          questionSelected({ _id: value.value, question: value.label });
          setFoundQuestions([]);
        }}
        {...props}
      />
    </form>
  );
};

export default QuestionSearch;

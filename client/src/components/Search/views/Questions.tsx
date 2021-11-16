import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { usePreviewQuestionSearchQuery } from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import QuestionCard from "../../Common/QuestionCard";

interface IQuestionsSearch {
  searchString: string;
}

const QuestionsSearch = ({ searchString }: IQuestionsSearch) => {
  const { data, loading } = usePreviewQuestionSearchQuery({
    variables: { searchString },
  });

  const content = React.useMemo(() => {
    if (data && !loading) {
      return (
        <Box>
          {data.searchQuestions.map((question) => (
            <QuestionCard question={question} />
          ))}
        </Box>
      );
    } else if (!loading && !data?.searchQuestions) {
      return <Heading>No Results</Heading>;
    } else return <Loading />;
  }, [data, loading]);

  return <Box>{content}</Box>;
};

export default QuestionsSearch;

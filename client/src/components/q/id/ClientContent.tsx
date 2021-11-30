import { Box, Divider, Flex } from "@chakra-ui/layout";
import React from "react";
import { useQuestionQuery } from "../../../generated/graphql";
import Loading from "../../Common/Loading";
import PageCard from "../../Common/PageCard";

interface IQuestionIdClientContent {
  id: string;
}

const QuestionIdClientContent = ({ id }: IQuestionIdClientContent) => {
  const { data, loading } = useQuestionQuery({
    variables: { id },
  });

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.question && !loading) {
      return data.question.relatedPages.map((relatedPage) => (
        <PageCard
          key={relatedPage._id}
          page={relatedPage}
          referenceObject={{
            type: "question",
            questionID: id,
          }}
        />
      ));
    } else return <Loading />;
  }, [data?.question, id, loading]);

  return (
    <Box>
      <Divider />
      <Flex pt={2}>{content}</Flex>
    </Box>
  );
};

export default QuestionIdClientContent;

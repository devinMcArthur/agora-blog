import { Center, Container, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { useQuestionsQuery } from "../../generated/graphql";
import QuestionCard from "../../components/Common/QuestionCard";
import SkeletonCard from "../../components/Common/SkeletonCard";
import setDocumentTitle from "../../utils/setDocumentTitle";

const Questions = () => {
  const { data, loading } = useQuestionsQuery();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    setDocumentTitle("Questions");
  });

  /**
   * ----- Rendering -----
   */

  let content = (
    <Flex flexDirection="column">
      <SkeletonCard variant="question" />
      <SkeletonCard variant="question" />
      <SkeletonCard variant="question" />
      <Center pt={4}>
        <Spinner />
      </Center>
    </Flex>
  );

  if (data?.questions && !loading) {
    const sortedQuestions = data.questions
      .slice()
      .sort((a, b) => b.referencedCount - a.referencedCount);
    const questionsJSX = sortedQuestions.map((question) => (
      <QuestionCard question={question} key={question._id} />
    ));

    content = <Flex flexDirection="column">{questionsJSX}</Flex>;
  }

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Questions;

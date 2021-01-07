import { Center, Container, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { useQuestionsQuery } from "../../generated/graphql";
import QuestionCard from "../Common/QuestionCard";
import SkeletonCard from "../Common/SkeletonCard";

const Questions = () => {
  const { data, loading } = useQuestionsQuery();

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
    const questionsJSX = data.questions.map((question) => (
      <QuestionCard question={question} />
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

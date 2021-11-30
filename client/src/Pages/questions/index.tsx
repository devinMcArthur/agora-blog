import React from "react";

import { useQuestionsQuery } from "../../generated/graphql";
import { Center, Container, Flex } from "@chakra-ui/layout";
import SkeletonCard from "../../components/Common/SkeletonCard";
import { Spinner } from "@chakra-ui/spinner";
import QuestionCard from "../../components/Common/QuestionCard";

const Questions = () => {
  const { data, loading } = useQuestionsQuery();

  /**
   * ----- Use-effects and other logic -----
   */

  const content = React.useMemo(() => {
    if (data?.questions && !loading) {
      return (
        <Flex flexDir="column">
          {data.questions
            .slice()
            .sort((a, b) => b.referencedCount - a.referencedCount)
            .map((question) => (
              <QuestionCard question={question} key={question._id} />
            ))}
        </Flex>
      );
    } else
      return (
        <Flex flexDirection="column">
          <SkeletonCard variant="question" />
          <SkeletonCard variant="question" />
          <SkeletonCard variant="question" />
          <Center pt={4}>
            <Spinner />
          </Center>
        </Flex>
      );
  }, [data, loading]);

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Questions;

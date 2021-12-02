import React from "react";

import Head from "next/head";
import { useQuestionsQuery } from "../../generated/graphql";
import { Center, Container, Flex } from "@chakra-ui/layout";
import SkeletonCard from "../../components/Common/SkeletonCard";
import { Spinner } from "@chakra-ui/spinner";
import QuestionCard from "../../components/Common/QuestionCard";
import InfiniteScroll from "../../components/Common/InfiniteScroll";

const Questions = () => {
  /**
   * ----- Hook Initialization -----
   */

  const { data, loading, fetchMore } = useQuestionsQuery();
  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && !loading) {
      fetchMore({
        variables: {
          options: {
            offset: data?.questions.length,
          },
        },
      }).then((data) => {
        if (data.data.questions.length === 0) setFinished(true);
      });
    }
  }, [data?.questions.length, fetchMore, finished, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.questions) {
      return (
        <Flex flexDir="column">
          {data.questions.map((question) => (
            <QuestionCard question={question} key={question._id} />
          ))}
          {loading && (
            <Center pt={4}>
              <Spinner />
            </Center>
          )}
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
  }, [data?.questions, loading]);

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>Questions - agora</title>
        <meta
          name="description"
          content="Collection of all questions answered by Agora"
        />
      </Head>
      <InfiniteScroll nextPage={nextPage} content={content} />
    </Container>
  );
};

export default Questions;

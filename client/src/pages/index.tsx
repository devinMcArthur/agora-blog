import React from "react";

import Head from "next/head";
import { usePagesQuery } from "../generated/graphql";
import { Flex, Container, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import SkeletonCard from "../components/Common/SkeletonCard";
import PageCard from "../components/Common/PageCard";
import InfiniteScroll from "../components/Common/InfiniteScroll";

const Home = () => {
  const { data, loading, fetchMore } = usePagesQuery();
  const [finished, setFinished] = React.useState(false);

  /**
   * ----- Functions -----
   */

  const nextPage = React.useCallback(() => {
    if (!finished && !loading) {
      fetchMore({
        variables: {
          options: {
            offset: data?.pages.length,
          },
        },
      }).then((data) => {
        if (data.data.pages.length === 0) setFinished(true);
      });
    }
  }, [data?.pages.length, fetchMore, finished, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.pages) {
      return (
        <Flex flexDirection="column" alignContent="center" id="pages-flex">
          {data.pages.map((page) => (
            <PageCard page={page} key={page._id} />
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
        <Flex flexDirection="column" id="pages-skeleton-flex">
          <SkeletonCard variant="page" />
          <SkeletonCard variant="page" />
          <SkeletonCard variant="page" />
          <Center pt={4}>
            <Spinner />
          </Center>
        </Flex>
      );
  }, [data, loading]);

  return (
    <Container minW="80%" p={4}>
      <Head>
        <title>agora</title>
      </Head>
      <InfiniteScroll nextPage={nextPage} content={content} />
    </Container>
  );
};

export default Home;

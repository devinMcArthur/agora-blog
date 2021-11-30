import React from "react";

import Head from "next/head";
import { usePagesQuery } from "../generated/graphql";
import { Flex, Container, Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import SkeletonCard from "../components/Common/SkeletonCard";
import PageCard from "../components/Common/PageCard";

const Home = () => {
  const { data, loading } = usePagesQuery();

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (data?.pages && !loading) {
      const pages = data.pages
        .slice()
        .sort((a, b) => b.referencedCount - a.referencedCount);
      return (
        <Flex flexDirection="column" alignContent="center" id="pages-flex">
          {pages.map((page) => (
            <PageCard page={page} key={page._id} />
          ))}
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
      {content}
    </Container>
  );
};

export default Home;

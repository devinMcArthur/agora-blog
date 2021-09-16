import * as React from "react";
import { Center, Container, Flex, Spinner } from "@chakra-ui/react";

import { withProvider } from "../Providers";

import { usePagesQuery } from "../../generated/graphql";
import SkeletonCard from "../Common/SkeletonCard";
import PageCard from "../Common/PageCard";

const HomePage = () => {
  const { data, loading } = usePagesQuery();

  let content = (
    <Flex flexDirection="column" id="pages-skeleton-flex">
      <SkeletonCard variant="page" />
      <SkeletonCard variant="page" />
      <SkeletonCard variant="page" />
      <Center pt={4}>
        <Spinner />
      </Center>
    </Flex>
  );
  if (data?.pages && !loading) {
    const pages = data.pages
      .slice()
      .sort((a, b) => b.referencedCount - a.referencedCount);
    content = (
      <Flex flexDirection="column" alignContent="center" id="pages-flex">
        {pages.map((page) => (
          <PageCard page={page} />
        ))}
      </Flex>
    );
  }

  return (
    <Container minW="80%" pt={4} pb={4}>
      {content}
    </Container>
  );
};

export default withProvider(HomePage);

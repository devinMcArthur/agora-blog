import * as React from "react";
import { Container, Flex } from "@chakra-ui/react";

import PageCard from "../Common/PageCard";

import { withProvider } from "../Providers";

import { usePagesQuery } from "../../generated/graphql";
import SkeletonCard from "../Common/SkeletonCard";

const HomePage = () => {
  const { data, loading } = usePagesQuery();

  let content = (
    <Flex flexDirection="column">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </Flex>
  );
  if (data?.pages && !loading) {
    content = (
      <Flex flexDirection="column">
        {data!.pages.map((page) => (
          <PageCard page={page} />
        ))}
      </Flex>
    );
  }

  return (
    <Container maxW="80%" pt={4} pb={4}>
      {content}
    </Container>
  );
};

export default withProvider(HomePage);

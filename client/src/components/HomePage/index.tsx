import * as React from "react";
import { Center, Container, Flex, Spinner } from "@chakra-ui/react";

import PageCard from "../Common/PageCard";

import { withProvider } from "../Providers";

import { usePagesQuery } from "../../generated/graphql";
import SkeletonCard from "../Common/SkeletonCard";

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
    content = (
      <Flex flexDirection="column" alignContent="center" id="pages-flex">
        {data!.pages.map((page) => (
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

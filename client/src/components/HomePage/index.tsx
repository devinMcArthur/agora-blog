import * as React from "react";
import { Center, Container, Flex, Spinner } from "@chakra-ui/react";

import { withProvider } from "../Providers";

import { useTopicQuery } from "../../generated/graphql";
import SkeletonCard from "../Common/SkeletonCard";
import Topic from "../Topic";

const HomePage = () => {
  const { data, loading } = useTopicQuery({
    variables: { id: "602d76c45d04d902f8e6af19" },
  });

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
  if (data?.topic && !loading) {
    content = <Topic topic={data.topic} />;
  }

  return (
    <Container minW="80%" pt={4} pb={4}>
      {content}
    </Container>
  );
};

export default withProvider(HomePage);

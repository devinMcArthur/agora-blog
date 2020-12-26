import * as React from "react";
import { Spinner } from "@chakra-ui/react";

import Container from "../Common/Container";
import PageCard from "../Common/PageCard";

import { withProvider } from "../Providers";

import Flex from "../Common/Flex";
import { usePagesQuery } from "../../generated/graphql";

const HomePage = () => {
  const { data, loading } = usePagesQuery();

  return (
    <Container layout="maxi" flexDirection="column">
      {!data && loading ? (
        <Spinner />
      ) : (
        <Flex flexDirection="column">
          {data!.pages.map((page) => (
            <PageCard page={page} />
          ))}
        </Flex>
      )}
    </Container>
  );
};

export default withProvider(HomePage);

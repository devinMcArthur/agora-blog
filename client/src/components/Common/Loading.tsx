import React from "react";

import { Center, Container, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container>
      <Center>
        <Spinner />
      </Center>
    </Container>
  );
};

export default Loading;

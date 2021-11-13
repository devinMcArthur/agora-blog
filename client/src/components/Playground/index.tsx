import React from "react";

import { Box, Heading } from "@chakra-ui/react";
import NewVariable from "../NewVariable";

const Playground = () => {
  return (
    <Box w="100%">
      <Heading>Playground</Heading>
      <Box display="flex" flexDir="row" justifyContent="space-around" w="100%">
        <NewVariable />
      </Box>
    </Box>
  );
};

export default Playground;

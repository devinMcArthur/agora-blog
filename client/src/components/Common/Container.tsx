import * as React from "react";
import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = (props: any) => {
  return <ChakraContainer>{props.children}</ChakraContainer>;
};

export default Container;

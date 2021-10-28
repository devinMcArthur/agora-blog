import * as React from "react";

import { Box, Link, Stack, Heading, Spacer } from "@chakra-ui/react";

import { withProvider } from "../Providers";
import { Flex } from "@chakra-ui/react";
import { RouteComponentProps, Link as RouterLink } from "react-router-dom";

interface Props extends RouteComponentProps {}

class Navbar extends React.Component<Props> {
  render() {
    return (
      <Box
        shadow="bottomShadow"
        p={3}
        position="fixed"
        height="5%"
        width="100%"
        zIndex="999"
        backgroundColor="gray.500"
      >
        <Flex align="center" justify="space-between" minW="80%" margin="0 auto">
          <Link as={RouterLink} to="/" margin="auto">
            <Heading as="h4" fontSize={["2xl", "2xl", "3xl"]}>
              agora
            </Heading>
          </Link>
          <Spacer />
          <Stack spacing={2} direction="row" mr={4}>
            <Link as={RouterLink} to="/questions">
              Questions
            </Link>
          </Stack>
        </Flex>
      </Box>
    );
  }
}

export default withProvider(Navbar);

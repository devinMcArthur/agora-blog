import * as React from "react";
import { Box, Link, Stack, Heading, Spacer } from "@chakra-ui/react";

import { withProvider } from "../Providers";
import { Flex } from "@chakra-ui/react";
import { RouteComponentProps, Link as RouterLink } from "react-router-dom";

interface Props extends RouteComponentProps {}

class WebadminNavbar extends React.Component<Props> {
  render() {
    return (
      <Box shadow="bottomShadow" p={3}>
        <Flex align="center" justify="space-between" minW="80%" margin="0 auto">
          <Link as={RouterLink} to="/" ml={4}>
            <Heading as="h4" fontSize="3xl">
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

export default withProvider(WebadminNavbar);

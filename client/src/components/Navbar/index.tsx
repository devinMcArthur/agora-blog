import * as React from "react";

import { Box, Link, Stack, Heading, Spacer } from "@chakra-ui/react";

import { Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { navbarHeight } from "../../constants/styles";
import NavbarAccount from "./views/Account";
import { useAuth } from "../../contexts/Auth";
import NavbarSearch from "./views/Search";

const Navbar = () => {
  const {
    state: { user },
  } = useAuth();

  return (
    <Box
      shadow="bottomShadow"
      p={1}
      position="fixed"
      height={navbarHeight}
      width="100%"
      zIndex="998"
      backgroundColor="gray.400"
    >
      <Box
        display="flex"
        // alignItems="center"
        justifyContent="space-between"
        minW="80%"
        margin="0 auto"
        height="100%"
      >
        <Link as={RouterLink} to="/" marginY="auto" height="100%" pt={1} ml={4}>
          <Heading as="h4" fontSize={["2xl", "2xl", "3xl"]} h="100%" p="auto">
            agora
          </Heading>
        </Link>
        <NavbarSearch />
        <Stack
          spacing={4}
          direction="row"
          mr={4}
          height="100%"
          pt={user ? 1 : 2}
        >
          <Link
            as={RouterLink}
            to="/questions"
            fontWeight="bold"
            pt={user ? 2 : 1}
          >
            Questions
          </Link>
          <NavbarAccount />
        </Stack>
      </Box>
    </Box>
  );
};

export default Navbar;

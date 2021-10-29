import React from "react";

import { Box } from "@chakra-ui/layout";

import PageSearch from "../../Common/PageSearch";
import { useHistory } from "react-router";

const NavbarSearch = () => {
  const history = useHistory();

  return (
    <Box id="box" p="auto" w="30%">
      <PageSearch
        mt={1}
        placeholder="Search . . ."
        pageSelected={(page) => history.push(`/p/${page.slug}`)}
        bg="gray.200"
        color="gray.900"
        _focus={{ boxShadow: "none" }}
        dropdownProps={{ backgroundColor: "gray.200", color: "gray.900" }}
      />
    </Box>
  );
};

export default NavbarSearch;

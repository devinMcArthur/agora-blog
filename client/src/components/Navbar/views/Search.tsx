import React from "react";

import { Box } from "@chakra-ui/layout";

import { useHistory } from "react-router";
import GeneralSearch from "../../Common/GeneralSearch";

const NavbarSearch = () => {
  const history = useHistory();

  return (
    <Box id="box" p="auto" w={["50%", "50%"]}>
      <GeneralSearch
        mt={1}
        placeholder="Search . . ."
        handleSubmit={(value) => history.push(`/search?search_string=${value}`)}
        itemSelected={(item) => console.log("selectedItem", item)}
        bg="gray.200"
        color="gray.900"
        _focus={{ boxShadow: "none" }}
        dropdownProps={{ backgroundColor: "gray.200", color: "gray.900" }}
      />
    </Box>
  );
};

export default NavbarSearch;

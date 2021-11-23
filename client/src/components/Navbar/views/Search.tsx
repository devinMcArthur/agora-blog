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
        itemSelected={(value, extraData) => {
          if (!extraData) {
            console.warn("Internal Error: no extra data found");
            return;
          }

          switch (extraData.type) {
            case "page": {
              history.push(`/p/${extraData.slug!}`);
              break;
            }
            case "question": {
              history.push(`/q/${value.value}`);
              break;
            }
            case "variable": {
              history.push(`/v/${value.value}`);
              break;
            }
          }
        }}
        bg="gray.200"
        color="gray.900"
        _focus={{ boxShadow: "none" }}
        dropdownProps={{ backgroundColor: "gray.200", color: "gray.900" }}
      />
    </Box>
  );
};

export default NavbarSearch;

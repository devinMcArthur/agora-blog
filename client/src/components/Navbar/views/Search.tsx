import React from "react";

import { Box } from "@chakra-ui/layout";

import GeneralSearch from "../../Common/GeneralSearch";
import { useRouter } from "next/router";

const NavbarSearch = () => {
  const router = useRouter();

  return (
    <Box id="box" p="auto" w={["50%", "50%"]}>
      <GeneralSearch
        mt={1}
        placeholder="Search . . ."
        handleSubmit={(value) => router.push(`/search?search_string=${value}`)}
        itemSelected={(value, extraData) => {
          if (!extraData) {
            // eslint-disable-next-line no-console
            console.warn("Internal Error: no extra data found");
            return;
          }

          switch (extraData.type) {
            case "page": {
              router.push(`/p/${extraData.slug!}`);
              break;
            }
            case "question": {
              router.push(`/q/${value.value}`);
              break;
            }
            case "variable": {
              router.push(`/v/${value.value}`);
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

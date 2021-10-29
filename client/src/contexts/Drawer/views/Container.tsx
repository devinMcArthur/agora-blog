import { CloseButton } from "@chakra-ui/close-button";
import { Box, BoxProps } from "@chakra-ui/layout";
import React from "react";
import { useDrawer } from "..";
import { navbarHeight } from "../../../constants/styles";
import DrawerEditProposalStatement from "./EditProposalStatement";
import DrawerParagraphStatement from "./ParagraphStatement";

const DrawerContainer = () => {
  const {
    state: { type },
    clearState,
  } = useDrawer();

  const hide: BoxProps = {};
  if (!type) hide.display = "none";

  const content = React.useMemo(() => {
    switch (type) {
      case "PARAGRAPH-STATEMENT": {
        return <DrawerParagraphStatement />;
      }
      case "EDIT-PROPOSAL-STATEMENT": {
        return <DrawerEditProposalStatement />;
      }
    }
  }, [type]);

  return (
    <Box
      top={navbarHeight}
      right="0"
      height="95%"
      width={["100%", "40%", "30%", "30%", "20%"]}
      position="fixed"
      overflowY="hidden"
      backgroundColor="gray.400"
      boxShadow="rightDrawerShadow"
      zIndex="999"
      {...hide}
    >
      <Box display="flex" flexDir="column" p={1}>
        <Box display="flex" justifyContent="end">
          <CloseButton onClick={() => clearState()} size="sm" />
        </Box>
        {content}
      </Box>
    </Box>
  );
};

export default DrawerContainer;

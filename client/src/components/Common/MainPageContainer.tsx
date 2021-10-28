import React from "react";

import { Box } from "@chakra-ui/layout";
import { useDrawer } from "../../contexts/Drawer";

const MainPageContainer: React.FC = ({ children }) => {
  const { isActive } = useDrawer();

  return (
    <Box
      id="prop-container"
      display="flex"
      flexDir="row"
      pt="6%"
      pr={isActive ? ["100%", "40%", "30%", "30%", "20%"] : "0"}
    >
      {children}
    </Box>
  );
};

export default MainPageContainer;

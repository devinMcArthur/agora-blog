import * as React from "react";
import { Box, Flex, useStyleConfig } from "@chakra-ui/react";

const Card = (props: any) => {
  const styles = useStyleConfig("Card");

  return (
    <Box sx={styles} id="card">
      <Flex flexDirection="column">{props.children}</Flex>
    </Box>
  );
};

export default Card;

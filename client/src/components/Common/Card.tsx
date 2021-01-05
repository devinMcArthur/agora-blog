import * as React from "react";
import { Box, Flex, useStyleConfig } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const Card = (props: Props) => {
  const styles = useStyleConfig("Card");

  return (
    <Box sx={styles}>
      <Flex flexDirection="column">{props.children}</Flex>
    </Box>
  );
};

export default Card;

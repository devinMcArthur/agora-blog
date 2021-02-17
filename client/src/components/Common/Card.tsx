import * as React from "react";
import { Box, ChakraProps, Flex, useStyleConfig } from "@chakra-ui/react";

const Card = (
  props: ChakraProps & {
    children: React.ReactNode;
    size?: "md";
    variants?: "full";
  }
) => {
  const { size, ...rest } = props;
  const styles = useStyleConfig("Card", { size });

  return (
    <Box sx={styles} {...rest}>
      <Flex flexDirection="column">{props.children}</Flex>
    </Box>
  );
};

export default Card;

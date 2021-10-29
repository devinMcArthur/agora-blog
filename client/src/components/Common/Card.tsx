import * as React from "react";
import { Box, BoxProps, Flex, useStyleConfig } from "@chakra-ui/react";

interface ICard extends BoxProps {
  size?: "md";
  variant?: "full";
}

const Card: React.FC<ICard> = ({ size, children, ...props }) => {
  const styles = useStyleConfig("Card", { size });

  return (
    <Box sx={styles} {...props}>
      <Flex flexDirection="column">{children}</Flex>
    </Box>
  );
};

export default Card;

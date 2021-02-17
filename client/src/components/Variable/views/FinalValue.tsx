import { Box, ChakraStyleProps } from "@chakra-ui/react";
import React from "react";

const FinalValue = (
  props: { finalValue: number | string } & ChakraStyleProps
) => {
  let { finalValue, ...rest } = props;
  if (typeof finalValue === "string") finalValue = parseFloat(finalValue);
  const number = Math.round((finalValue + Number.EPSILON) * 100) / 100;

  return (
    <Box {...rest}>
      {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    </Box>
  );
};

export default FinalValue;

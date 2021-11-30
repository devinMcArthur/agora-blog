import { Box, ChakraStyleProps } from "@chakra-ui/react";
import React from "react";
import numberFormat from "../../utils/numberFormat";

const FinalValue = (
  props: { finalValue: number | string } & ChakraStyleProps
) => {
  let { finalValue, ...rest } = props;
  if (typeof finalValue === "string") finalValue = parseFloat(finalValue);
  const number = Math.round((finalValue + Number.EPSILON) * 100) / 100;

  return (
    <Box as="span" {...rest}>
      {numberFormat(number)}
    </Box>
  );
};

export default FinalValue;

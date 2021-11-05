import React from "react";

import { Box } from "@chakra-ui/layout";
import { RenderElementProps, useFocused, useSelected } from "slate-react";

import { VariableElementType } from "../../../../models/slate";
import numberFormat from "../../../../utils/numberFormat";

const VariableElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const { finalValue } = element as VariableElementType;

  const focused = useFocused();
  const selected = useSelected();

  return (
    <Box
      {...attributes}
      as="span"
      contentEditable={false}
      backgroundColor="gray.100"
      fontWeight="bold"
      padding={1}
      border="1px solid black"
      borderRadius={3}
      boxShadow={selected && focused ? "0 0 0 2px #B4D5FF" : "none"}
    >
      {numberFormat(finalValue)}
      {children}
    </Box>
  );
};

export default VariableElement;

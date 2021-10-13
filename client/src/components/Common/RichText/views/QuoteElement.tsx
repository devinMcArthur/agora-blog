import React from "react";

import { Box } from "@chakra-ui/layout";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { QuoteElementType } from "../../../../models/slate";
import QuotedStatement from "../../../Statement/views/QuotedStatement";

const QuoteElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const { statementId } = element as QuoteElementType;

  const focused = useFocused();
  const selected = useSelected();

  return (
    <Box
      as="span"
      {...attributes}
      contentEditable={false}
      cursor="default"
      boxShadow={selected && focused ? "0 0 0 2px #B4D5FF" : "none"}
      backgroundColor="gray.100"
      borderRadius={2}
      padding={1}
    >
      <QuotedStatement statementID={statementId} />
      {children}
    </Box>
  );
};

export default QuoteElement;

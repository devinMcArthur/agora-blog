import React from "react";

import { Box } from "@chakra-ui/layout";
import ImageDisplay from "../../../Statement/views/ImageDisplay";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { ImageElementType } from "../../../../models/slate";

const ImageElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  const focused = useFocused();
  const selected = useSelected();

  return (
    <Box
      display="block"
      ml="auto"
      mr="auto"
      w={{ base: "50%", lg: "30%" }}
      boxShadow={selected && focused ? "0 0 0 2px #B4D5FF" : "none"}
      {...attributes}
    >
      <ImageDisplay image={(element as ImageElementType)!} canExpand={false} />
      {children}
    </Box>
  );
};

export default ImageElement;

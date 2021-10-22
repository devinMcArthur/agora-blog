import React from "react";

import { Box, Text } from "@chakra-ui/layout";
import ImageDisplay from "../../../Statement/views/ImageDisplay";
import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { ImageElementType } from "../../../../models/slate";
import TextArea from "../../TextArea";
import { Editor } from "slate";
import { CustomEditor } from "../utils";
import TextField from "../../TextField";
import { Button } from "@chakra-ui/button";
import isValidUrl from "../../../../utils/isValidUrl";

interface IImageElement extends RenderElementProps {
  editor: Editor;
}

const ImageElement = ({
  attributes,
  children,
  element,
  editor,
}: IImageElement) => {
  const [caption, setCaption] = React.useState(
    (element as ImageElementType).caption || ""
  );
  const [sourceUrl, setSourceUrl] = React.useState(
    (element as ImageElementType).sourceURL || ""
  );
  const [sourceUrlError, setSourceUrlError] = React.useState<string>();

  const focused = useFocused();
  const selected = useSelected();

  const changed = React.useMemo(() => {
    const imageElement = element as ImageElementType;
    return (
      caption !== imageElement.caption || sourceUrl !== imageElement.sourceURL
    );
  }, [element, caption, sourceUrl]);

  React.useEffect(() => {
    if (!!sourceUrl && !isValidUrl(sourceUrl))
      setSourceUrlError("Must enter valid URL");
    else setSourceUrlError(undefined);
  }, [sourceUrl]);

  return (
    <Box
      display="block"
      ml="auto"
      mr="auto"
      w={{ base: "50%", lg: "30%" }}
      boxShadow={selected && focused ? "0 0 0 2px #B4D5FF" : "none"}
      {...attributes}
    >
      <ImageDisplay
        image={(element as ImageElementType)!}
        canExpand={false}
        showCaption={false}
      >
        <Box
          as="form"
          w="100%"
          onSubmit={(e) => {
            e.preventDefault();
            CustomEditor.updateImage(
              editor,
              {
                ...(element as ImageElementType),
                caption,
                sourceURL: sourceUrl,
              },
              editor.selection
            );
          }}
        >
          <TextArea
            label="Caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            backgroundColor="white"
          />
          <TextField
            errorMessage={sourceUrlError}
            label={"Source URL"}
            value={sourceUrl}
            onChange={(e) => {
              setSourceUrl(e.target.value);
            }}
            backgroundColor="white"
          />
          <Box display="flex" flexDir="row" justifyContent="space-between">
            <Button isDisabled={!changed} type="submit" variant="outlined">
              Submit
            </Button>
            {changed && (
              <Text marginY="auto" color="gray.500">
                unsaved changes
              </Text>
            )}
          </Box>
        </Box>
      </ImageDisplay>
      {children}
    </Box>
  );
};

export default ImageElement;

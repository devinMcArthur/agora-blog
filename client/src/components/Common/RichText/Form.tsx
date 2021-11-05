import { Box } from "@chakra-ui/layout";
import React from "react";

import { BaseEditor, createEditor, Editor } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { IRichText } from ".";
import { Button } from "@chakra-ui/button";

import { CustomElements, StyledText } from "../../../models/slate";
import Element from "./views/Element";
import Leaf from "./views/Leaf";
import StyleMenu from "./views/StyleMenu";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElements;
    Text: StyledText;
  }
}

const RichTextForm = ({
  value,
  onChange,
  pageId,
  onCancel,
  onSubmit,
}: IRichText) => {
  const editor = React.useMemo(
    () => withInlineElements(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = React.useCallback(
    (props) => <Element {...props} editor={editor} pageId={pageId} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Box display="flex" flexDir="row" justifyContent="space-between">
        <StyleMenu editor={editor} />
        <Box>
          {onCancel && (
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onCancel}
              mx={1}
            >
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button borderColor="black" onClick={onSubmit} mx={1}>
              Submit
            </Button>
          )}
        </Box>
      </Box>
      <Box overflowY="scroll" height="45rem">
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
        />
      </Box>
    </Slate>
  );
};

const withInlineElements = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  const isElementInline = (element: CustomElements) => {
    return (
      element.type === "variable" ||
      element.type === "quote" ||
      element.type === "image"
    );
  };

  editor.isInline = (element: CustomElements) => {
    return isElementInline(element) ? true : isInline(element);
  };

  editor.isVoid = (element: CustomElements) => {
    return isElementInline(element) ? true : isVoid(element);
  };

  return editor;
};

export default React.memo(RichTextForm);

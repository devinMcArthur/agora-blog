import { Box } from "@chakra-ui/layout";
import React from "react";

import { BaseEditor, createEditor, Editor } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { IRichText } from ".";
import { Button } from "@chakra-ui/button";
import isHotkey from "is-hotkey";

import {
  CustomElements,
  SlateStyleTypes,
  StyledText,
} from "../../../models/slate";
import Element from "./views/Element";
import Leaf from "./views/Leaf";
import StyleMenu from "./views/StyleMenu";
import { CustomEditor } from "./utils";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElements;
    Text: StyledText;
  }
}

const Hotkeys = {
  "mod+b": SlateStyleTypes.bold,
  "mod+i": SlateStyleTypes.italic,
};

const RichTextForm = ({
  value,
  onChange,
  pageId,
  submitLoading,
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
              isLoading={submitLoading}
              backgroundColor="white"
            >
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button
              borderColor="black"
              backgroundColor="white"
              onClick={onSubmit}
              mx={1}
              isLoading={submitLoading}
            >
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
          onKeyDown={(event) => {
            for (const hotkey in Hotkeys) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                switch (hotkey) {
                  case "mod+b": {
                    CustomEditor.toggleBold(editor);
                    break;
                  }
                  case "mod+i": {
                    CustomEditor.toggleItalic(editor);
                  }
                }
              }
            }
          }}
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

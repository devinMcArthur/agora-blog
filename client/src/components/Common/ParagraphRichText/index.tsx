import { Box } from "@chakra-ui/layout";
import React from "react";

import { BaseEditor, createEditor, Editor } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";

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

const ParagraphRichText = () => {
  const {
    state: { slateParagraph, paragraph },
    updateSlateParagraph,
  } = useParagraphForm();

  const editor = React.useMemo(
    () => withInlineElements(withHistory(withReact(createEditor()))),
    []
  );

  const renderElement = React.useCallback(
    (props) => (
      <Element {...props} editor={editor} pageId={paragraph?.page._id} />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

  React.useEffect(() => {
    console.log("-- INITIAL RICH TEXT MOUNT --");
  }, []);

  return (
    <Slate
      editor={editor}
      value={slateParagraph!}
      onChange={(value) => {
        console.log("update", value);
        updateSlateParagraph(value);
      }}
    >
      <StyleMenu editor={editor} />
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

export default React.memo(ParagraphRichText);

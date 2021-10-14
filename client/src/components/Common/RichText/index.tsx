import React from "react";
import { createEditor, Descendant, Editor } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { CustomElements } from "../../../models/slate";

import ActionMenu from "./views/ActionMenu";
import Element from "./views/Element";
import Leaf from "./views/Leaf";

interface IRichText {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  type?: "PARAGRAPH";
  pageId?: string;
}

const RichText = ({ value, type, pageId, onChange }: IRichText) => {
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
      <ActionMenu editor={editor} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
      />
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

export default RichText;

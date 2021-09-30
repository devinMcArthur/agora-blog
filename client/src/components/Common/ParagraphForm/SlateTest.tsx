import { Button } from "@chakra-ui/button";
import React from "react";
import { createEditor, Editor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import QuotedStatement from "../../Statement/views/QuotedStatement";

const SlateTest: React.FC = () => {
  const {
    state: { slateParagraph },
    updateSlateParagraph,
  } = useParagraphForm();

  console.log(slateParagraph);

  const editor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );

  const renderElement = React.useCallback(
    (props) => <Element {...props} />,
    []
  );

  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={slateParagraph!}
      onChange={updateSlateParagraph}
    >
      <div>
        <Button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleBold(editor);
          }}
          margin={1}
        >
          Bold
        </Button>
        <Button
          onClick={(event) => {
            event.preventDefault();
            CustomEditor.toggleItalic(editor);
          }}
          margin={1}
        >
          Italic
        </Button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
      />
    </Slate>
  );
};

const Element = ({ attributes, children }: RenderElementProps) => {
  return <p {...attributes}>{children}</p>;
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <i>{children}</i>;
  }

  if (leaf.externalMentionUrl) {
    children = <span style={{ color: "blue" }}>{children}</span>;
  }

  if (leaf.internalMentionPageId) {
    children = <span style={{ color: "blue" }}>{children}</span>;
  }

  if (leaf.quoteStatementId) {
    children = (
      <div contentEditable={false}>
        <QuotedStatement statementID={leaf.quoteStatementId} key={1} />
      </div>
    );
  }

  if (leaf.variableId) {
    children = <div contentEditable={false}>{children}</div>;
  }

  return <span {...attributes}>{children}</span>;
};

const CustomEditor = {
  isMarkActive: (
    editor: Editor,
    mark:
      | "bold"
      | "italic"
      | "internalMentionPageId"
      | "externalMentionUrl"
      | "variableId"
      | "quoteStatementId"
  ) => {
    const marks = Editor.marks(editor);
    if (!marks) return false;
    return marks[mark] === true;
  },
  toggleBold: (editor: Editor) => {
    const isActive = CustomEditor.isMarkActive(editor, "bold");

    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },
  toggleItalic: (editor: Editor) => {
    const isActive = CustomEditor.isMarkActive(editor, "italic");

    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },
};

export default SlateTest;

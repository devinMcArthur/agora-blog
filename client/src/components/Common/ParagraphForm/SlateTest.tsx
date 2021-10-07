import React from "react";

import { Box } from "@chakra-ui/layout";
import { createEditor } from "slate";
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
import ActionMenu from "./views/ActionMenu";

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
      <ActionMenu editor={editor} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
        }}
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
    children = <span style={{ color: "purple" }}>{children}</span>;
  }

  if (leaf.internalMentionPageId) {
    children = <span style={{ color: "blue" }}>{children}</span>;
  }

  if (leaf.quoteStatementId) {
    children = (
      <Box contentEditable={false} cursor="default">
        <QuotedStatement statementID={leaf.quoteStatementId} key={1} />
      </Box>
    );
  }

  if (leaf.variableId) {
    children = <div contentEditable={false}>{children}</div>;
  }

  return <span {...attributes}>{children}</span>;
};

export default SlateTest;

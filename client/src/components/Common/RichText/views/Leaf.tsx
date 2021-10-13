import React from "react";
import { RenderLeafProps } from "slate-react";

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

  if (leaf.internalMentionPage) {
    children = <span style={{ color: "blue" }}>{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;

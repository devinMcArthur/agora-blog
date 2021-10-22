import React from "react";
import { RenderLeafProps } from "slate-react";

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const id = Math.floor(Math.random() * 100000).toString();

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

  if (leaf.highlight) {
    children = <span style={{ backgroundColor: "lightblue" }}>{children}</span>;
  }

  return (
    <span {...attributes} className="leaf" id={id}>
      {children}
    </span>
  );
};

export default Leaf;

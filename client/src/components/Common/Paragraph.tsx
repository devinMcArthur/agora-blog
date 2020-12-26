import React from "react";

import { DisplayParagraphSnippetFragment } from "../../generated/graphql";

import Statement from "../Sentence";

const Paragraph = (props: { paragraph: DisplayParagraphSnippetFragment }) => {
  const paragraphJSX = props.paragraph.statements.map((statement) => (
    <div style={{ textIndent: "1%", lineHeight: "2", marginBottom: "1em" }}>
      <Statement statement={statement} showSources={true} />
    </div>
  ));

  return <div>{paragraphJSX}</div>;
};

export default Paragraph;

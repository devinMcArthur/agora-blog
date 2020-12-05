import React from "react";

import { ParagraphPopulated } from "../../typescript/interfaces/documents/Paragraph";

import Sentence from "../Sentence";

const Paragraph = (props: { paragraph: ParagraphPopulated }) => {
  const paragraphJSX = props.paragraph.sentences.map((sentence) => (
    <div style={{ textIndent: "1%", lineHeight: "2", marginBottom: "1em" }}>
      <Sentence sentence={sentence} showSources={true} />
    </div>
  ));

  return <div>{paragraphJSX}</div>;
};

export default Paragraph;

import React from "react";

import { ParagraphPopulated } from "../../typescript/interfaces/documents/Paragraph";

import PageService from "../../services/pageService";

const Paragraph = (props: { paragraph: ParagraphPopulated }) => {
  const paragraphJSX = props.paragraph.sentences.map((sentence) => {
    return PageService().translateSentenceToJSX(sentence);
  });

  return <div>{paragraphJSX}</div>;
};

export default Paragraph;

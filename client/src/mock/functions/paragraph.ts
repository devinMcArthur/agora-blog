import { Types } from "mongoose";

import MockData from "../data";

import SentenceFunctions from "./sentence";

import Paragraph, {
  ParagraphPopulated,
} from "../../typescript/interfaces/documents/Paragraph";
import { SentencePopulated } from "../../typescript/interfaces/documents/Sentence";

const findParagraph = (paragraphID: Types.ObjectId) => {
  return MockData.paragraphs.find(
    (paragraph) => paragraph._id.toString() === paragraphID.toString()
  );
};

const populateParagraph = (paragraph: Paragraph) => {
  if (paragraph) {
    let sentences: SentencePopulated[] = [];

    for (let i in paragraph.sentences) {
      const sentence = SentenceFunctions.findSentence(paragraph.sentences[i]);
      sentences.push(SentenceFunctions.populateSentence(sentence!));
    }

    const populatedParagraph: ParagraphPopulated = {
      ...paragraph,
      sentences,
    };
    return populatedParagraph;
  }
  return undefined;
};

const ParagraphFunctions = {
  findParagraph,
  populateParagraph,
};

export default ParagraphFunctions;

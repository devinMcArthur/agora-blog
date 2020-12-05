import { Types } from "mongoose";
import { ParagraphPopulated } from "../typescript/interfaces/documents/Paragraph";

export default function ParagraphService() {
  // Returns sentence in paragraph that references a given page
  const findSentenceWithPageReference = (
    paragraph: ParagraphPopulated,
    pageID: Types.ObjectId
  ) => {
    return paragraph.sentences.find((sentence) =>
      sentence.versions[
        sentence.versions.length - 1
      ].stringArray.find((stringArray) =>
        stringArray.styles.find(
          (style) =>
            style.type === "mention" &&
            style.variant === "internal" &&
            style.value.pageID.toString() === pageID.toString()
        )
      )
    );
  };

  const findSentenceWithQuestionReference = (
    paragraph: ParagraphPopulated,
    questionID: Types.ObjectId
  ) => {
    return paragraph.sentences.find((sentence) =>
      sentence.questionConnections.find(
        (connection) =>
          connection.questionID.toString() === questionID.toString()
      )
    );
  };

  const findSentenceWithVariableReference = (
    paragraph: ParagraphPopulated,
    variableID: Types.ObjectId
  ) => {
    return paragraph.sentences.find((sentence) =>
      sentence.versions[
        sentence.versions.length - 1
      ].stringArray.find((stringArray) =>
        stringArray.styles.find(
          (style) =>
            style.type === "variable" &&
            style.value.variableID.toString() === variableID.toString()
        )
      )
    );
  };

  return {
    findSentenceWithPageReference,
    findSentenceWithQuestionReference,
    findSentenceWithVariableReference,
  };
}

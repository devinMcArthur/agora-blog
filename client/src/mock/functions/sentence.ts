import { Types } from "mongoose";

import MockData from "../data";

import Sentence, {
  SentencePopulated,
} from "../../typescript/interfaces/documents/Sentence";

import PageFunctions from "./page";
import QuestionFunctions from "./question";

const findSentence = (sentenceID: Types.ObjectId) => {
  return MockData.sentences.find((sentence) => {
    return sentence._id.toString() === sentenceID.toString();
  });
};

const populateSentence = (sentence: Sentence) => {
  const sentenceObject: SentencePopulated = JSON.parse(
    JSON.stringify(sentence)
  );
  // String Array
  let stringArray =
    sentenceObject.versions[sentence.versions.length - 1].stringArray;
  for (let i = 0; i < stringArray.length; i++) {
    const object = stringArray[i];

    // Styles
    for (let s = 0; s < object.styles.length; s++) {
      const style = object.styles[s];

      switch (style.type) {
        case "quote":
          // Quote Style
          const sentenceDoc = findSentence(style.value.sentenceID);
          const page = PageFunctions.findPage(sentenceDoc?.pageID!);
          style.value.sentence = populateSentence(sentenceDoc!);
          style.value.page = page!;
          break;
        case "mention":
          if (style.variant === "internal") {
            style.value.page = PageFunctions.findPage(style.value.pageID)!;
          }
          break;
        default:
          break;
      }
    }
  }

  // Questions
  sentenceObject.questions = [];
  for (let i = 0; i < sentenceObject.questionConnections.length; i++) {
    sentenceObject.questions[i] = QuestionFunctions.findQuestion(
      sentenceObject.questionConnections[i].questionID
    )!;
  }

  // Sources
  if (sentenceObject.sources?.pages) {
    for (let i = 0; i < sentenceObject.sources.pages.length; i++) {
      sentenceObject.sources.pages[i].page = PageFunctions.findPage(
        sentenceObject.sources.pages[i].pageID
      )!;
    }
  }

  return sentenceObject;
};

const findSentenceThatReferencesPage = (pageID: Types.ObjectId) => {
  const sentences: Sentence[] = [];

  MockData.sentences.forEach((sentence) => {
    if (sentence.current === true)
      sentence.versions[sentence.versions.length - 1].stringArray.forEach(
        (stringArray) => {
          const style = stringArray.styles.find(
            (styles) =>
              styles.type === "mention" &&
              styles.variant === "internal" &&
              styles.value.pageID.toString() === pageID.toString()
          );
          if (style) sentences.push(sentence);
        }
      );
  });

  return sentences;
};

const findSentenceThatReferencesQuestion = (questionID: Types.ObjectId) => {
  const sentences: Sentence[] = [];

  MockData.sentences.forEach((sentence) => {
    if (sentence.current === true)
      sentence.questionConnections.forEach((connection) => {
        if (connection.questionID.toString() === questionID.toString())
          sentences.push(sentence);
      });
  });

  return sentences;
};

const SentenceFunctions = {
  findSentence,
  populateSentence,
  findSentenceThatReferencesPage,
  findSentenceThatReferencesQuestion,
};

export default SentenceFunctions;

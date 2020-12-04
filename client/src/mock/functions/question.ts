import { Types } from "mongoose";
import Question, {
  QuestionPopulated,
} from "../../typescript/interfaces/documents/Question";

import MockData from "../data";
import PageFunctions from "./page";
import SentenceFunctions from "./sentence";

const findQuestion = (questionID: Types.ObjectId) => {
  return MockData.questions.find((question) => {
    return question._id.toString() === questionID.toString();
  });
};

const populateQuestion = (question: Question) => {
  const fullObject: QuestionPopulated = JSON.parse(JSON.stringify(question));

  // Get all sentences that reference this question
  const sentencesThatReference = SentenceFunctions.findSentenceThatReferencesQuestion(
    question._id
  );

  // Get all pageIDs these sentences are linked to
  let pageIDs = sentencesThatReference.map((sentence) => sentence.pageID);

  // Make list unique
  pageIDs = pageIDs.filter((id, index) => pageIDs.indexOf(id) === index);

  // Get and populate all pages
  let relatedPages = pageIDs.map((id) => {
    const page = PageFunctions.findPage(id);
    return PageFunctions.populatePage(page!);
  });

  fullObject.relatedPages = relatedPages;

  return fullObject;
};

const QuestionFunctions = {
  findQuestion,
  populateQuestion,
};

export default QuestionFunctions;

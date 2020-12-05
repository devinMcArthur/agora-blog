import { Types } from "mongoose";
import Question, {
  QuestionPopulated,
} from "../../typescript/interfaces/documents/Question";

import MockData from "../data";
import PageFunctions from "./page";
import QuestionPageConnectionFunctions from "./questionPageConnection";

const getRootQuestions = () => {
  const questions = MockData.questions;

  let populatedQuestions: QuestionPopulated[] = [];
  questions.forEach((question) => {
    populatedQuestions.push(populateQuestion(question!));
  });

  // Sort by how many times the page is referenced
  populatedQuestions = populatedQuestions.sort(
    (a, b) => b.referencedCount - a.referencedCount
  );

  return populatedQuestions;
};

const findQuestion = (questionID: Types.ObjectId) => {
  return MockData.questions.find((question) => {
    return question._id.toString() === questionID.toString();
  });
};

const populateQuestion = (question: Question) => {
  const fullObject: QuestionPopulated = JSON.parse(JSON.stringify(question));

  const relatedPages = QuestionPageConnectionFunctions.getPagesThatReference(
    question._id
  ).map((page) => PageFunctions.populatePage(page!));

  fullObject.relatedPages = relatedPages;

  fullObject.referencedCount = QuestionPageConnectionFunctions.getReferencedCount(
    question._id
  );

  return fullObject;
};

const QuestionFunctions = {
  getRootQuestions,
  findQuestion,
  populateQuestion,
};

export default QuestionFunctions;

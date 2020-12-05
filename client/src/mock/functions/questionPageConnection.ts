import { Types } from "mongoose";
import Page from "../../typescript/interfaces/documents/Page";
import questionPageConnections from "../data/questionPageConnections";
import PageFunctions from "./page";

const getPagesThatReference = (questionID: Types.ObjectId) => {
  const pages: Page[] = [];
  questionPageConnections.forEach((connection) => {
    if (connection.questionID.toString() === questionID.toString()) {
      const page = PageFunctions.findPage(connection.referrerPageID);
      if (page) pages.push(page);
    }
  });

  return pages;
};

const getReferencedCount = (questionID: Types.ObjectId) => {
  return questionPageConnections.filter(
    (connection) => connection.questionID.toString() === questionID.toString()
  ).length;
};

const QuestionPageConnectionFunctions = {
  getPagesThatReference,
  getReferencedCount,
};

export default QuestionPageConnectionFunctions;

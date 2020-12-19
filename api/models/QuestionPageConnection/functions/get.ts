import { Types } from "mongoose";
import { QuestionPageConnectionDocument, QuestionPageConnectionModel } from ".";
import Page, { PageDocument } from "../../Page";

export type QuestionPageConnectionGetByQuestionID = (
  questionID: Types.ObjectId | string
) => Promise<QuestionPageConnectionDocument[]>;
function byQuestionID(
  QuestionPageConnection: QuestionPageConnectionModel,
  questionID: Types.ObjectId | string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const questionPageConnections = await QuestionPageConnection.find({
        questionID,
      });

      resolve(questionPageConnections);
    } catch (e) {
      reject(e);
    }
  });
}

export type QuestionPageConnectionGetPagesThatReferenceQuestion = (
  questionID: Types.ObjectId | string
) => Promise<PageDocument[]>;
function pagesThatReferenceQuestion(
  QuestionPageConnection: QuestionPageConnectionModel,
  questionID: Types.ObjectId | string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const questionPageConnections = await QuestionPageConnection.getByQuestionID(
        questionID
      );
      const pages: PageDocument[] = [];

      questionPageConnections.forEach(async (connection) => {
        pages.push(
          await Page.getByID(connection.referrerPageID, { throwError: true })
        );
      });

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
}

export type QuestionPageConnectionGetQuestionReferencedCount = (
  questionID: Types.ObjectId | string
) => Promise<number>;
function questionReferencedCount(
  QuestionPageConnection: QuestionPageConnectionModel,
  questionID: Types.ObjectId | string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const questionPageConnections = await QuestionPageConnection.getByQuestionID(
        questionID
      );

      resolve(questionPageConnections.length);
    } catch (e) {
      reject(e);
    }
  });
}

export default {
  byQuestionID,
  pagesThatReferenceQuestion,
  questionReferencedCount,
};

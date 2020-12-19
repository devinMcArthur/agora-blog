import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import QuestionPageConnectionSchema from "../schema";
import get, {
  QuestionPageConnectionGetByQuestionID,
  QuestionPageConnectionGetPagesThatReferenceQuestion,
  QuestionPageConnectionGetQuestionReferencedCount,
} from "./get";

// DEFINE TYPES //

export interface QuestionPageConnectionDocument
  extends AgoraTypes.QuestionPageConnection.Documents.QuestionPageConnection {}

export interface QuestionPageConnectionModel
  extends Model<QuestionPageConnectionDocument> {
  getByQuestionID: QuestionPageConnectionGetByQuestionID;
  getPagesThatReferenceQuestion: QuestionPageConnectionGetPagesThatReferenceQuestion;
  getQuestionReferencedCount: QuestionPageConnectionGetQuestionReferencedCount;
}

// GET //

QuestionPageConnectionSchema.statics.getByQuestionID = async function (
  questionID: Types.ObjectId | string
) {
  return get.byQuestionID(this, questionID);
};

QuestionPageConnectionSchema.statics.getPagesThatReferenceQuestion = async function (
  questionID: Types.ObjectId | string
) {
  return get.pagesThatReferenceQuestion(this, questionID);
};

QuestionPageConnectionSchema.statics.getQuestionReferencedCount = async function (
  questionID: Types.ObjectId | string
) {
  return get.questionReferencedCount(this, questionID);
};

export default QuestionPageConnectionSchema;

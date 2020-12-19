import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import QuestionSchema from "../schema";
import get, { QuestionGetByID, QuestionGetList } from "./get";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populate from "../../Statement/functions/populate";
import { QuestionPageConnectionPopulateNormal } from "./populate";

// DEFINE TYPES //

export interface QuestionDocument
  extends AgoraTypes.Question.Documents.Question {
  populateNormal: QuestionPageConnectionPopulateNormal;
}

export interface QuestionModel extends Model<QuestionDocument> {
  getByID: QuestionGetByID;
  getList: QuestionGetList;
}

// ADD FUNCTIONS TO SCHEMA //

// GET //

QuestionSchema.statics.getByID = async function (
  id: Types.ObjectId | string,
  options: GetByIDOptions
) {
  return get.byID(this, id, options);
};

QuestionSchema.statics.getList = async function () {
  return get.list(this);
};

// POPULATE //

QuestionSchema.methods.populateNormal = async function () {
  return populate.normal(this);
};

export default QuestionSchema;

import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import StatementSchema from "../schema";
import get, {
  StatementGetByID,
  StatementGetStatementsThatReferencePage,
  StatementGetStatementsThatReferenceQuestion,
} from "./get";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populate from "./populate";

// DEFINE TYPES //

export interface StatementDocument
  extends AgoraTypes.Statement.Documents.Statement {
  populateNormal(): Promise<AgoraTypes.Statement.Documents.StatementPopulated>;
}

export interface StatementModel extends Model<StatementDocument> {
  getByID: StatementGetByID;
  getStatementsThatReferencePage: StatementGetStatementsThatReferencePage;
  getStatementsThatReferenceQuestion: StatementGetStatementsThatReferenceQuestion;
}

// ADD FUNCTIONS TO SCHEMA //

// GET //

StatementSchema.statics.getByID = async function (
  id: Types.ObjectId | string,
  options: GetByIDOptions
) {
  return get.byID(this, id, options);
};

StatementSchema.statics.getStatementsThatReferencePage = async function (
  pageID: Types.ObjectId | string
) {
  return get.statementsThatReferencePage(this, pageID);
};

StatementSchema.statics.getStatementsThatReferenceQuestion = async function (
  questionID: Types.ObjectId | string
) {
  return get.statementsThatReferenceQuestion(this, questionID);
};

// POPULATE //

StatementSchema.methods.populateNormal = async function () {
  return populate.normal(this);
};

export default StatementSchema;

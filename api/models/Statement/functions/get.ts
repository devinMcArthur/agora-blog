import AgoraTypes from "@devin_mcarthur/agora-types";
import { Types } from "mongoose";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import { StatementDocument, StatementModel } from "./index";

type StatementGetPopulatedReturn<
  opts extends GetByIDOptions
> = opts["populate"] extends "normal"
  ? // Return populated document if options.populate === "normal"
    Promise<AgoraTypes.Statement.Documents.StatementPopulated>
  : opts["populate"] extends "full"
  ? // Return fully populated document if options.populate === "full"
    Promise<AgoraTypes.Statement.Documents.StatementPopulatedFull>
  : // Return Statement Document if none of the above
    Promise<StatementDocument>;

type StatementGetReturn<
  opts extends GetByIDOptions
> = opts["throwError"] extends true
  ? // Returns normal document if options.populate === "none"
    StatementGetPopulatedReturn<opts>
  : // Will either return the 3 document types or null if throwError=false
    StatementGetPopulatedReturn<opts> | null;

export type StatementGetByID = <opts extends GetByIDOptions>(
  id: Types.ObjectId | string,
  options: opts
) => StatementGetReturn<opts>;
const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  populate: "none",
};
function byID(
  Statement: StatementModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const statement = await Statement.findById(id);

      if (!statement && options.throwError) {
        throw new Error("Statement.getByID: Unable to find statement");
      }

      if (options.populate === "normal") {
        resolve(await statement?.populateNormal());
      }

      resolve(statement);
    } catch (e) {
      reject(e);
    }
  });
}

export type StatementGetStatementsThatReferencePage = (
  pageID: Types.ObjectId | string
) => Promise<StatementDocument[]>;
function statementsThatReferencePage(
  Statement: StatementModel,
  pageID: Types.ObjectId | string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const statements = await Statement.find({
        current: true,
        "versions.-1.stringArray.styles.type": "mention",
        "versions.-1.stringArray.styles.variant": "mention",
        "versions.-1.stringArray.styles.value.pageID": pageID,
      });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
}

export type StatementGetStatementsThatReferenceQuestion = (
  questionID: Types.ObjectId | string
) => Promise<StatementDocument[]>;
function statementsThatReferenceQuestion(
  Statement: StatementModel,
  questionID: Types.ObjectId | string
) {
  return new Promise(async (resolve, reject) => {
    try {
      const statements = await Statement.find({ questions: questionID });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
}

export default {
  byID,
  statementsThatReferencePage,
  statementsThatReferenceQuestion,
};

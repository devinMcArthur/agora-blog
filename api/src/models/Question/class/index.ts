import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getByID_Options";
import { QuestionDocument, QuestionModel } from "@models";

import { QuestionSchema } from "../schema";
import get, { IStatementReferencesOptions } from "./get";
import { IQuestionBuildData } from "@typescript/models/Question";
import build from "./build";

@ObjectType()
export class QuestionClass extends QuestionSchema {
  /**
   * GET
   */

  public static async getById(
    this: QuestionModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byId(this, id, options);
  }

  public static async getList(this: QuestionModel) {
    return get.list(this);
  }

  public async getPagesThatReference(this: QuestionDocument) {
    return get.pagesThatReference(this);
  }

  public async getReferencedCount(this: QuestionDocument) {
    return get.referencedCount(this);
  }

  public async getStatementReferences(
    this: QuestionDocument,
    options?: IStatementReferencesOptions
  ) {
    return get.statementReferences(this, options);
  }

  public static async search(this: QuestionModel, searchString: string) {
    return get.search(this, searchString);
  }

  public static async getByQuestion(this: QuestionModel, question: string) {
    return get.byQuestion(this, question);
  }

  /**
   * ----- Build -----
   */

  public static async build(this: QuestionModel, data: IQuestionBuildData) {
    return build.build(this, data);
  }
}

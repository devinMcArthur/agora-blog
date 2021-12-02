import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getById_Options";
import {
  QuestionDocument,
  QuestionModel,
  QuestionPageConnectionDocument,
} from "@models";

import { QuestionSchema } from "../schema";
import get, { IStatementReferencesOptions } from "./get";
import { IQuestionBuildData } from "@typescript/models/Question";
import build from "./build";
import { IListOptions } from "@typescript/interface/list_Options";
import update from "./update";
import schema_update from "./schema_update";

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

  public static async getList(
    this: QuestionModel,
    options?: IListOptions<QuestionDocument>
  ) {
    return get.list(this, options);
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

  public static async search(
    this: QuestionModel,
    searchString: string,
    limit?: number
  ) {
    return get.search(this, searchString, limit);
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

  /**
   * ----- Update -----
   */

  public static async updateForQuestionPageConnection(
    this: QuestionModel,
    questionPageConnection: QuestionPageConnectionDocument
  ) {
    return update.forQuestionPageConnection(this, questionPageConnection);
  }

  public async updateReferencedCount(this: QuestionDocument) {
    return update.referencedCount(this);
  }

  /**
   * ----- Schema Update -----
   */

  public static async updateAllFromV1ToV2(this: QuestionModel) {
    return schema_update.allFromV1ToV2(this);
  }

  public async updateFromV1ToV2(this: QuestionDocument) {
    return schema_update.fromV1ToV2(this);
  }
}

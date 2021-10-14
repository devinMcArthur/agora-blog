import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getByID_Options";
import { QuestionDocument, QuestionModel } from "@models";

import { QuestionSchema } from "../schema";
import get, { IStatementReferencesOptions } from "./get";

@ObjectType()
export class QuestionClass extends QuestionSchema {
  /**
   * GET
   */

  public static async getByID(
    this: QuestionModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public static async getList(
    this: QuestionModel,
    options?: { fromCache: boolean }
  ) {
    return get.list(this, options);
  }

  public async getPagesThatReference(
    this: QuestionDocument,
    options?: { fromCache: boolean }
  ) {
    return get.pagesThatReference(this, options);
  }

  public async getReferencedCount(
    this: QuestionDocument,
    options?: { fromCache: boolean }
  ) {
    return get.referencedCount(this, options);
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
}

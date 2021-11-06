import { Types } from "mongoose";
import {
  PageConnectionDocument,
  PageConnectionModel,
  StatementDocument,
} from "@models";
import { ObjectType } from "type-graphql";

import { PageConnectionSchema } from "../schema";
import build from "./build";
import get from "./get";
import remove from "./remove";
import update from "./update";
import { IPageConnectionData } from "@typescript/models/PageConnection";

@ObjectType()
export class PageConnectionClass extends PageConnectionSchema {
  /**
   * ----- Get -----
   */

  public static async getByStatement(
    this: PageConnectionModel,
    statement: StatementDocument
  ) {
    return get.byStatement(this, statement);
  }

  public static async getByPages(
    this: PageConnectionModel,
    referrerPageId: Types.ObjectId | string,
    referencedPageId: Types.ObjectId | string
  ) {
    return get.byPages(this, referrerPageId, referencedPageId);
  }

  /**
   * ----- Build -----
   */

  public static async build(
    this: PageConnectionModel,
    data: IPageConnectionData
  ) {
    return build.build(this, data);
  }

  public static async updateForStatement(
    this: PageConnectionModel,
    statement: StatementDocument
  ) {
    return build.forStatement(this, statement);
  }

  /**
   * ----- Update -----
   */

  public async addStatement(
    this: PageConnectionDocument,
    statementId: Types.ObjectId
  ) {
    return update.addStatement(this, statementId);
  }

  /**
   * ----- Remove -----
   */

  public async removeStatement(
    this: PageConnectionDocument,
    statement: StatementDocument
  ) {
    return remove.statement(this, statement);
  }
}

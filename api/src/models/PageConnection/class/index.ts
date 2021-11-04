import { PageConnectionModel, StatementDocument } from "@models";
import { ObjectType } from "type-graphql";

import { PageConnectionSchema } from "../schema";
import build from "./build";
import get from "./get";

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

  /**
   * ----- Build -----
   */

  public static async updateForStatement(
    this: PageConnectionModel,
    statement: StatementDocument
  ) {
    return build.forStatement(this, statement);
  }
}

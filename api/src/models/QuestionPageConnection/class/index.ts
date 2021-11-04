import { QuestionPageConnectionModel, StatementDocument } from "@models";
import { ObjectType } from "type-graphql";

import { QuestionPageConnectionSchema } from "../schema";
import build from "./build";
import get from "./get";

@ObjectType()
export class QuestionPageConnectionClass extends QuestionPageConnectionSchema {
  /**
   * ----- Get -----
   */

  public static async getByStatement(
    this: QuestionPageConnectionModel,
    statement: StatementDocument
  ) {
    return get.byStatement(this, statement);
  }

  /**
   * ----- Build -----
   */

  public static async updateForStatement(
    this: QuestionPageConnectionModel,
    statement: StatementDocument
  ) {
    return build.forStatement(this, statement);
  }
}

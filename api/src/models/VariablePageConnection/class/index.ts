import { StatementDocument, VariablePageConnectionModel } from "@models";
import { ObjectType } from "type-graphql";

import { VariablePageConnectionSchema } from "../schema";
import build from "./build";
import get from "./get";

@ObjectType()
export class VariablePageConnectionClass extends VariablePageConnectionSchema {
  /**
   * ----- Get -----
   */

  public static async getByStatement(
    this: VariablePageConnectionModel,
    statement: StatementDocument
  ) {
    return get.byStatement(this, statement);
  }

  /**
   * ----- Build -----
   */

  public static async updateForStatement(
    this: VariablePageConnectionModel,
    statement: StatementDocument
  ) {
    return build.forStatement(this, statement);
  }
}

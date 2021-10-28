import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { ParagraphDocument, ParagraphModel } from "@models";
import GetByIDOptions from "@typescript/interface/getByID_Options";

import { ParagraphSchema } from "../schema";
import get from "./get";

@ObjectType()
export class ParagraphClass extends ParagraphSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: ParagraphModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public async getStatements(this: ParagraphDocument) {
    return get.statements(this);
  }

  public async getEditProposals(this: ParagraphDocument) {
    return get.editProposals(this);
  }
}

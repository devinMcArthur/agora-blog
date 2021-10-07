import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { ParagraphDocument, ParagraphModel } from "@models";
import GetByIDOptions from "@typescript/interface/getByID_Options";

import { ParagraphSchema } from "../schema";
import get from "./get";

@ObjectType()
export class ParagraphClass extends ParagraphSchema {
  public static async getByID(
    this: ParagraphModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public async getStatements(
    this: ParagraphDocument,
    options?: { fromCache: boolean }
  ) {
    return get.statements(this, options);
  }
}

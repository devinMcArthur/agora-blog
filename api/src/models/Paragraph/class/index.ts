import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { ParagraphDocument, ParagraphModel } from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";

import { ParagraphSchema } from "../schema";
import get from "./get";
import { IParagraphBuildData } from "@typescript/models/Paragraph";
import build from "./build";
import validate from "./validate";

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

  /**
   * ----- Build -----
   */

  public static buildFirst(this: ParagraphModel, data: IParagraphBuildData) {
    return build.first(this, data);
  }

  /**
   * ----- Validate -----
   */

  public async validateDocument(this: ParagraphDocument) {
    return validate.document(this);
  }
}

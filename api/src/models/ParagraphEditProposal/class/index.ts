import { Types } from "mongoose";
import {
  ParagraphDocument,
  ParagraphEditProposalDocument,
  ParagraphEditProposalModel,
} from "@models";
import { IParagraphEditProposalBuildData } from "@typescript/models/ParagraphEditProposal";
import { ObjectType } from "type-graphql";
import { ParagraphEditProposalSchema } from "../schema";
import build from "./build";
import get from "./get";
import validate from "./validate";
import GetByIDOptions from "@typescript/interface/getByID_Options";

@ObjectType()
export class ParagraphEditProposalClass extends ParagraphEditProposalSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: ParagraphEditProposalModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getByParagraph(
    this: ParagraphEditProposalModel,
    paragraph: ParagraphDocument
  ) {
    return get.byParagraph(this, paragraph);
  }

  public async getAuthor(this: ParagraphEditProposalDocument) {
    return get.author(this);
  }

  public async getParagraph(this: ParagraphEditProposalDocument) {
    return get.paragraph(this);
  }

  /**
   * ----- Build -----
   */

  public static async build(
    this: ParagraphEditProposalModel,
    data: IParagraphEditProposalBuildData
  ) {
    return build.build(this, data);
  }

  /**
   * ----- Validation -----
   */

  public async validateDocument(this: ParagraphEditProposalDocument) {
    return validate.document(this);
  }
}

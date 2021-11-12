import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import {
  ParagraphEditProposalDocument,
  ParagraphEditProposalStatementClass,
  StatementDocument,
  StatementModel,
} from "@models";

import get, { IStatementByIdOptions } from "./get";
import { StatementSchema } from "../schema";
import { IStatementBuildData } from "@typescript/models/Statement";
import build from "./build";
import validate from "./validate";

@ObjectType()
export class StatementClass extends StatementSchema {
  /**
   * ----- Build -----
   */

  public static async build(this: StatementModel, data: IStatementBuildData) {
    return build.build(this, data);
  }

  public static async buildFromEditProposalStatement(
    this: StatementModel,
    statementItem: ParagraphEditProposalStatementClass,
    editProposal: ParagraphEditProposalDocument
  ) {
    return build.fromEditProposalStatement(this, statementItem, editProposal);
  }

  /**
   * ----- Get -----
   */

  public static async getById(
    this: StatementModel,
    id: Types.ObjectId | string,
    options?: IStatementByIdOptions
  ) {
    return get.byId(this, id, options);
  }

  /**
   * ----- Validate -----
   */

  public async validateDocument(this: StatementDocument) {
    return validate.document(this);
  }

  /**
   * ----- Virtuals -----
   */

  public get currentVersion() {
    return this.versions[this.versions.length - 1];
  }
}

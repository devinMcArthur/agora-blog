import { Types } from "mongoose";
import {
  VariableEditProposalDocument,
  VariableEditProposalModel,
} from "@models";
import { ObjectType } from "type-graphql";
import { VariableEditProposalSchema } from "../schema";
import get from "./get";
import GetByIDOptions from "@typescript/interface/getById_Options";
import build from "./build";
import { IVariableEditProposalData } from "@typescript/models/VariableEditProposal";
import validate from "./validate";
import interact from "./interact";

@ObjectType()
export class VariableEditProposalClass extends VariableEditProposalSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: VariableEditProposalModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  /**
   * ----- Build -----
   */

  public static async build(
    this: VariableEditProposalModel,
    data: IVariableEditProposalData
  ) {
    return build.build(this, data);
  }

  /**
   * ----- Validate -----
   */

  public async validateDocument(this: VariableEditProposalDocument) {
    return validate.document(this);
  }

  /**
   * ----- Interact -----
   */

  public async approve(this: VariableEditProposalDocument) {
    return interact.approve(this);
  }
}

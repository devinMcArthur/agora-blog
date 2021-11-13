import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getById_Options";
import {
  VariableDocument,
  VariableEditProposalDocument,
  VariableModel,
  VariableVersionClass,
} from "@models";

import { VariableSchema } from "../schema";
import get from "./get";
import { IVariableBuildData } from "@typescript/models/Variable";
import build from "./build";
import validate from "./validate";
import update from "./update";

@ObjectType()
export class VariableClass extends VariableSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: VariableModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public async getFinalValue(this: VariableDocument) {
    return get.finalValue(this);
  }

  public static async getVersionsFinalValue(
    this: VariableModel,
    variableValue: VariableVersionClass
  ) {
    return get.versionsFinalValue(this, variableValue);
  }

  public async getPagesThatReference(this: VariableDocument) {
    return get.pagesThatReference(this);
  }

  public static async search(this: VariableModel, searchString: string) {
    return get.search(this, searchString);
  }

  public static async getByTitle(this: VariableModel, title: string) {
    return get.byTitle(this, title);
  }

  public async getAuthor(this: VariableDocument) {
    return get.author(this);
  }

  /**
   * ----- Build -----
   */

  public static async build(this: VariableModel, data: IVariableBuildData) {
    return build.build(this, data);
  }

  /**
   * ----- Validate -----
   */

  public async validateDocument(this: VariableDocument) {
    return validate.document(this);
  }

  /**
   * ----- Update -----
   */

  public async updateFromProposal(
    this: VariableDocument,
    variableEditProposal: VariableEditProposalDocument
  ) {
    return update.fromProposal(this, variableEditProposal);
  }
}

import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getByID_Options";
import { VariableDocument, VariableModel, VariableVersionClass } from "@models";

import { VariableSchema } from "../schema";
import get from "./get";

@ObjectType()
export class VariableClass extends VariableSchema {
  public static async getByID(
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

  public async getPagesThatReference(
    this: VariableDocument,
    options?: { fromCache: boolean }
  ) {
    return get.pagesThatReference(this, options);
  }
}

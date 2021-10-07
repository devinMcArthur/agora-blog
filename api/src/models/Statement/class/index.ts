import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getByID_Options";
import { StatementModel } from "@models";

import get from "./get";
import { StatementSchema } from "../schema";

@ObjectType()
export class StatementClass extends StatementSchema {
  public static async getByID(
    this: StatementModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions
  ) {
    return get.byID(this, id, options);
  }
}

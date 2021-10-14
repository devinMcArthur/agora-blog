import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import { StatementModel } from "@models";

import get, { IStatementByIdOptions } from "./get";
import { StatementSchema } from "../schema";

@ObjectType()
export class StatementClass extends StatementSchema {
  public static async getByID(
    this: StatementModel,
    id: Types.ObjectId | string,
    options?: IStatementByIdOptions
  ) {
    return get.byID(this, id, options);
  }
}

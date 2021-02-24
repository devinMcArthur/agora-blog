import { Types } from "mongoose";
import GetByIDOptions from "src/typescript/interface/getByID_Options";
import { ObjectType } from "type-graphql";
import { UserModel } from "..";
import UserSchema from "../schema";
import get from "./get";

@ObjectType()
export default class User extends UserSchema {
  // GET //

  public static async getByID(
    this: UserModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public static async getByUsername(
    this: UserModel,
    username: string,
    options: GetByIDOptions = {}
  ) {
    return get.byUsername(this, username, options);
  }
}

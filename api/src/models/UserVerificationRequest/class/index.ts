import { Types } from "mongoose";
import { UserDocument, UserVerificationRequestModel } from "@models";
import { ObjectType } from "type-graphql";
import { UserVerificationRequestSchema } from "../schema";
import get from "./get";
import build from "./build";
import GetByIDOptions from "@typescript/interface/getById_Options";

@ObjectType()
export class UserVerificationRequestClass extends UserVerificationRequestSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: UserVerificationRequestModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getByUserId(
    this: UserVerificationRequestModel,
    userId: string | Types.ObjectId
  ) {
    return get.byUserId(this, userId);
  }

  /**
   * ----- Build -----
   */

  public static async build(
    this: UserVerificationRequestModel,
    user: UserDocument
  ) {
    return build.build(this, user);
  }
}

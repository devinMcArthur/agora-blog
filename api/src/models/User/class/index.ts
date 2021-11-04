import { Types } from "mongoose";
import { UserDocument, UserModel } from "@models";
import { ObjectType } from "type-graphql";

import { UserSchema } from "../schema";
import GetByIDOptions from "@typescript/interface/getById_Options";
import get from "./get";
import interact from "./interact";
import { IUserData } from "@typescript/models/User";
import build from "./build";
import validate from "./validate";

@ObjectType()
export class UserClass extends UserSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: UserModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  public static async getByEmail(
    this: UserModel,
    email: string,
    options?: GetByIDOptions
  ) {
    return get.byEmail(this, email, options);
  }

  /**
   * ----- Build -----
   */

  public static async build(this: UserModel, data: IUserData) {
    return build.build(this, data);
  }

  /**
   * ----- Interact -----
   */

  public static async login(this: UserModel, email: string, password: string) {
    return interact.login(this, email, password);
  }

  /**
   * ----- Validate -----
   */

  public async validateDocument(this: UserDocument) {
    return validate.document(this);
  }
}

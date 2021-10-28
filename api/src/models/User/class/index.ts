import { Types } from "mongoose";
import { UserModel } from "@models";
import { ObjectType } from "type-graphql";

import { UserSchema } from "../schema";
import GetByIDOptions from "@typescript/interface/getByID_Options";
import get from "./get";
import interact from "./interact";

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
   * ----- Interact -----
   */

  public static async login(this: UserModel, email: string, password: string) {
    return interact.login(this, email, password);
  }
}

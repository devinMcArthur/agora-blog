import { Types } from "mongoose";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import { TopicModel } from "..";
import TopicSchema from "../schema";
import get from "./get";
import { ObjectType } from "type-graphql";

@ObjectType()
export default class Topic extends TopicSchema {
  public static async getByID(
    this: TopicModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }
}

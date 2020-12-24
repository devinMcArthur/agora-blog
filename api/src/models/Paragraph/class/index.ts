import { Types } from "mongoose";

import get from "./get";
import { prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import PageClass from "../../Page/class";
import { ParagraphDocument, ParagraphModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import StatementClass from "../../Statement/class";

@ObjectType()
export default class ParagraphClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: "PageClass", required: true })
  public page!: Ref<PageClass>;

  @Field(() => [StatementClass])
  @prop({ ref: "StatementClass" })
  public statements!: Ref<StatementClass>[];

  @Field()
  @prop({ required: true, type: Number })
  public version!: number;

  @Field()
  @prop({ type: Boolean, required: true, default: true })
  public mostRecent!: boolean;

  public static async getByID(
    this: ParagraphModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public async getStatements(this: ParagraphDocument) {
    return get.statements(this);
  }
}

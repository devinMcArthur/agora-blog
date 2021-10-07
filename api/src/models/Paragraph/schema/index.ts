import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { PageClass, StatementClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";

@ObjectType()
export class ParagraphSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public page!: Ref<PageClass>;

  @Field(() => [StatementClass])
  @prop({ ref: () => StatementClass })
  public statements!: Ref<StatementClass>[];

  @Field()
  @prop({ required: true, type: Number })
  public version!: number;

  @Field()
  @prop({ type: Boolean, required: true, default: true })
  public mostRecent!: boolean;
}

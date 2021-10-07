import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { PageClass, StatementClass } from "@models";

@ObjectType()
export class PageConnectionSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public referencedPage!: Ref<PageClass>;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public referrerPage!: Ref<PageClass>;

  @Field(() => StatementClass)
  @prop({ ref: () => StatementClass, required: true })
  public statement!: Ref<StatementClass>;
}

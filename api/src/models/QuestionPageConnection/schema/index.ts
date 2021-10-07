import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { PageClass, StatementClass, QuestionClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";

@ObjectType()
export class QuestionPageConnectionSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => QuestionClass)
  @prop({ ref: () => QuestionClass, required: true })
  public question!: Ref<QuestionClass>;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public referrerPage!: Ref<PageClass>;

  @Field(() => StatementClass)
  @prop({ ref: () => StatementClass, required: true })
  public statement!: Ref<StatementClass>;
}

import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";

import PageClass from "../../Page/class";
import QuestionClass from "../../Question/class";
import StatementClass from "../../Statement/class";

@ObjectType()
export default class QuestionPageConnectionClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => QuestionClass)
  @prop({ ref: "QuestionClass", required: true })
  public question!: Ref<QuestionClass>;

  @Field(() => PageClass)
  @prop({ ref: "PageClass", required: true })
  public referrerPage!: Ref<PageClass>;

  @Field(() => StatementClass)
  @prop({ ref: "StatementClass", required: true })
  public statement!: Ref<StatementClass>;
}

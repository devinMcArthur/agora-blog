import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";

import PageClass from "../../Page/class";
import StatementClass from "../../Statement/class";
import VariableClass from "../../Variable/class";

@ObjectType()
export default class VariablePageConnectionClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => VariableClass)
  @prop({ ref: "VariableClass", required: true })
  public variable!: Ref<VariableClass>;

  @Field(() => PageClass)
  @prop({ ref: "PageClass", required: true })
  public referrerPage!: Ref<PageClass>;

  @Field(() => StatementClass)
  @prop({ ref: "StatementClass", required: true })
  public statement!: Ref<StatementClass>;
}

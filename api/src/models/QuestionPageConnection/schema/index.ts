import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { PageClass, StatementClass, QuestionClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import SchemaVersions from "@constants/SchemaVersions";

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

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.QuestionPageConnection })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

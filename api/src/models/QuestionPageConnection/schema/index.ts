import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import {
  PageClass,
  StatementClass,
  QuestionClass,
  QuestionPageConnectionDocument,
  Question,
} from "@models";
import { post, prop, Ref } from "@typegoose/typegoose";
import SchemaVersions from "@constants/SchemaVersions";

@post<QuestionPageConnectionDocument>(
  "save",
  async (questionPageConnection) => {
    // Update question based on connection
    await Question.updateForQuestionPageConnection(questionPageConnection);
  }
)
@post<QuestionPageConnectionDocument>(
  "remove",
  async (questionPageConnection) => {
    // Update question based on connection
    await Question.updateForQuestionPageConnection(questionPageConnection);
  }
)
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

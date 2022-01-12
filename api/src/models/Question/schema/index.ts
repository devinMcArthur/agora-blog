import SchemaVersions from "@constants/SchemaVersions";
import { ES_updateQuestion } from "@elasticsearch/helpers/question";
import { QuestionDocument } from "@models";
import { prop, index, post } from "@typegoose/typegoose";
import replaceSpaces from "@utils/replaceSpaces";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@index({ question: "text" })
@ObjectType()
@post<QuestionDocument>("save", async (page) => {
  await ES_updateQuestion(page);
})
export class QuestionSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public question!: string;

  @Field()
  @prop({
    required: true,
    trim: true,
    default: function (this: QuestionDocument) {
      if (this) {
        return encodeURIComponent(replaceSpaces(this.question));
      }
    },
  })
  public slug!: string;

  @Field()
  @prop({ required: true, default: 0 })
  public referencedCount!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.Question })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

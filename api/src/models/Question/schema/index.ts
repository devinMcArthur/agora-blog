import SchemaVersions from "@constants/SchemaVersions";
import { QuestionDocument } from "@models";
import { prop, index } from "@typegoose/typegoose";
import replaceSpaces from "@utils/replaceSpaces";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@index({ question: "text" })
@ObjectType()
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
        return replaceSpaces(this.question);
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

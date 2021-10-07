import { index, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { ParagraphClass } from "@models";
import { Field, ID, ObjectType } from "type-graphql";

@index({ title: "text" })
@ObjectType()
export class PageSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field()
  @prop({ required: true, trim: true })
  public slug!: string;

  @Field(() => [ParagraphClass])
  @prop({ ref: () => ParagraphClass })
  public paragraphs!: Ref<ParagraphClass>[];
}

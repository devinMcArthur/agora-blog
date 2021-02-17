import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { TopicRow } from "./subDocuments";

@ObjectType()
export default class TopicSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field()
  @prop({ required: true, trim: true })
  public slug!: string;

  @Field(() => [TopicRow])
  @prop({ type: () => TopicRow, default: [] })
  public rows!: TopicRow[];
}

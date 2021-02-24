import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export default class UserSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public username!: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public name?: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public email?: string;

  @prop({ required: true })
  public password!: string;

  @Field()
  @prop({ required: true, default: false })
  public verified!: Boolean;

  @Field()
  @prop({ required: true, default: Date.now })
  public createdAt!: Date;
}

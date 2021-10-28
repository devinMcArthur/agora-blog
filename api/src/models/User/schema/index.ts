import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserSchema {
  @Field(() => ID, { nullable: true })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true })
  public firstName!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public lastName!: string;

  @Field({ nullable: true })
  @prop()
  public middleName!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public email!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public password!: string;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public verified!: boolean;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public admin!: boolean;
}

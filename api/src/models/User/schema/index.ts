import SchemaVersions from "@constants/SchemaVersions";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, maxlength: 50 })
  public firstName!: string;

  @Field({ nullable: false })
  @prop({ required: true, maxLength: 50 })
  public lastName!: string;

  @Field({ nullable: true })
  @prop({ maxlength: 50 })
  public middleName!: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public email!: string;

  @Field({ nullable: true })
  @prop({ maxlength: 160 })
  public bio?: string;

  @Field({ nullable: false })
  @prop({ required: true })
  public password!: string;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public verified!: boolean;

  @Field({ nullable: false })
  @prop({ required: true, default: false })
  public admin!: boolean;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.User })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

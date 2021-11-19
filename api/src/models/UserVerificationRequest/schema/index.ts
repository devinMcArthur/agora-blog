import SchemaVersions from "@constants/SchemaVersions";
import { UserClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserVerificationRequestSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => UserClass, { nullable: false })
  @prop({ ref: () => UserClass, required: true, immutable: true })
  public user!: Ref<UserClass>;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.UserVerificationRequest })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

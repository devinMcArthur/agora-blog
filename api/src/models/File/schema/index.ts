import { prop } from "@typegoose/typegoose";
import { MimeTypeEnum } from "@typescript/models/File";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class FileSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, enum: MimeTypeEnum })
  public mimetype!: MimeTypeEnum;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

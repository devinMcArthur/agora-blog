import SchemaVersions from "@constants/SchemaVersions";
import { UserClass, VariableVersionClass } from "@models";
import { index, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

export * from "./subDocuments";

@index({ title: "text" })
@ObjectType()
export class VariableSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field(() => [VariableVersionClass])
  @prop({ type: () => VariableVersionClass, default: [] })
  public versions!: VariableVersionClass[];

  @Field(() => UserClass)
  @prop({ ref: () => UserClass, required: true })
  public originalAuthor!: UserClass;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.Variable })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

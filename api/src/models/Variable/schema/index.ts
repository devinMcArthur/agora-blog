import { VariableVersionClass } from "@models";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

export * from "./subDocuments";

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
}

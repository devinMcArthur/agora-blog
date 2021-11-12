import { VariableClass, VariableVersionClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class VariableEditProposalSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => VariableClass, { nullable: false })
  @prop({ ref: () => VariableClass, required: true })
  public variable!: Ref<VariableClass>;

  @Field({ nullable: false })
  @prop({ required: true })
  public variableVersionIndex!: number;

  @Field(() => VariableVersionClass, { nullable: false })
  @prop({ type: () => VariableVersionClass, required: true })
  public value!: VariableVersionClass;

  @Field()
  @prop({ default: Date.now, required: true })
  public createdAt!: Date;
}

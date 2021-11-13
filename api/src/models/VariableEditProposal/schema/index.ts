import {
  UserClass,
  VariableClass,
  VariableEquationClass,
  VariableVersionClass,
} from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { VariableVersionTypes } from "@typescript/models/Variable";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Version implements Omit<VariableVersionClass, "sourceEditProposal"> {
  @Field()
  @prop({ required: true, enum: VariableVersionTypes })
  public type!: VariableVersionTypes;

  @Field({ nullable: true })
  @prop({ required: false })
  public number?: number;

  @Field(() => [VariableEquationClass])
  @prop({ type: () => VariableEquationClass, default: [] })
  public equation!: VariableEquationClass[];

  @Field({ nullable: true })
  @prop({ required: false })
  public sourceUrl?: string;

  @Field({ nullable: false })
  @prop({ default: new Date(), required: true })
  public createdAt!: Date;
}

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

  @Field({ nullable: false })
  @prop({ required: true })
  public description!: string;

  @Field(() => Version, { nullable: false })
  @prop({ type: () => Version, required: true })
  public value!: Version;

  @Field(() => UserClass, { nullable: false })
  @prop({ ref: () => UserClass, required: true })
  public author!: Ref<UserClass>;

  @Field()
  @prop({ default: Date.now, required: true })
  public createdAt!: Date;
}

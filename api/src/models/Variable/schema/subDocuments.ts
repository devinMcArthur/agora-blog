import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

import { VariableClass } from "@models";
import {
  VariableEquationTypes,
  VariableOperatorTypes,
  VariableVersionTypes,
} from "@typescript/models/Variable";

@ObjectType()
export class VariableEquationClass {
  @Field({ nullable: false })
  @prop({ required: true, enum: VariableEquationTypes })
  public type!: VariableEquationTypes;

  @Field({ nullable: true })
  @prop({ required: false, enum: VariableOperatorTypes })
  public operator?: VariableOperatorTypes;

  @Field({ nullable: true })
  @prop({ required: false })
  public number?: number;

  /**
   * Can only reference a variable w/ type === "number"
   */
  @Field(() => VariableClass, { nullable: true })
  @prop({ ref: () => VariableClass, required: false })
  public variable?: Ref<VariableClass>;
}

export interface VariableEquationDocument
  extends DocumentType<VariableEquationClass> {}

@ObjectType()
export class VariableVersionClass {
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

export interface VariableVersionDocument
  extends DocumentType<VariableVersionClass> {}

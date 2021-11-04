import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

import { VariableClass } from "@models";

@ObjectType()
export class VariableEquationClass {
  @Field({ nullable: false })
  @prop({ required: true, enum: ["operator", "number", "variable"] })
  public type!: "operator" | "number" | "variable";

  @Field({ nullable: true })
  @prop({ required: false, enum: ["(", ")", "+", "-", "/", "*", "^"] })
  public operator?: "(" | ")" | "+" | "-" | "/" | "*" | "^";

  @Field({ nullable: true })
  @prop({ required: false })
  public number?: number;

  @Field(() => VariableClass, { nullable: true })
  @prop({ ref: () => VariableClass, required: false })
  public variable?: Ref<VariableClass>;
}

export interface VariableEquationDocument
  extends DocumentType<VariableEquationClass> {}

@ObjectType()
export class VariableVersionClass {
  @Field()
  @prop({ required: true, enum: ["number", "equation"] })
  public type!: "number" | "equation";

  @Field()
  @prop({ required: false })
  public number?: number;

  @Field(() => [VariableEquationClass])
  @prop({ type: () => VariableEquationClass, default: [] })
  public equation!: VariableEquationClass[];

  @Field({ nullable: true })
  @prop({ required: false })
  public sourceUrl?: string;

  @Field()
  @prop({ default: new Date(), required: true })
  public createdAt!: Date;
}

export interface VariableVersionDocument
  extends DocumentType<VariableVersionClass> {}

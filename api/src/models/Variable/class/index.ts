import { Types } from "mongoose";

import { Field, ID, ObjectType } from "type-graphql";
import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import get from "./get";
import { VariableDocument, VariableModel } from "..";

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
  @prop({ ref: "VariableClass", required: false })
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

  @Field()
  @prop({ required: false })
  public sourceURL?: string;

  @Field()
  @prop({ default: new Date(), required: true })
  public createdAt!: Date;
}

export interface VariableVersionDocument
  extends DocumentType<VariableVersionClass> {}

@ObjectType()
export default class VariableClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field(() => [VariableVersionClass])
  @prop({ type: () => VariableVersionClass, default: [] })
  public versions!: VariableVersionClass[];

  public static async getByID(
    this: VariableModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public async getFinalValue(this: VariableDocument) {
    return get.finalValue(this);
  }

  public static async getVersionsFinalValue(
    this: VariableModel,
    variableValue: VariableVersionClass
  ) {
    return get.versionsFinalValue(this, variableValue);
  }

  public async getPagesThatReference(
    this: VariableDocument,
    options?: { fromCache: boolean }
  ) {
    return get.pagesThatReference(this, options);
  }
}

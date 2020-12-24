import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { DocumentType, prop, Ref } from "@typegoose/typegoose";

import get from "./get";
import PageClass from "../../Page/class";
import { StatementModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import QuestionClass from "../../Question/class";
import VariableClass from "../../Variable/class";

@ObjectType()
export class StatementValueClass {
  @Field({ nullable: true })
  @prop({ trim: true })
  public url?: string;

  @Field(() => PageClass, { nullable: true })
  @prop({ ref: "PageClass", required: false })
  public page?: Ref<PageClass>;

  @Field(() => StatementClass, { nullable: true })
  @prop({ ref: "StatementClass", required: false })
  public statement?: Ref<StatementClass>;

  @Field(() => VariableClass, { nullable: true })
  @prop({ ref: "VariableClass", required: false })
  public variable?: Ref<VariableClass>;
}

export interface StatementValueDocument
  extends DocumentType<StatementValueClass> {}

@ObjectType()
class StyleClass {
  @Field()
  @prop({ required: true, enum: ["mention", "variable", "quote", "bold"] })
  public type!: "mention" | "variable" | "quote" | "bold";

  @Field({ nullable: true })
  @prop({ required: false, enum: ["internal", "external"] })
  public variant?: "internal" | "external";

  @Field(() => StatementValueClass)
  @prop({ type: () => StatementValueClass, default: {} })
  public value!: StatementValueClass;
}

@ObjectType()
class StringArrayClass {
  @Field({ nullable: true })
  @prop({ required: false, trim: true })
  public string?: string;

  @Field(() => [StyleClass])
  @prop({ type: () => StyleClass, default: [] })
  public styles!: StyleClass[];
}

@ObjectType()
export class StatementSourcesClass {
  @Field(() => [PageClass])
  @prop({ ref: "PageClass", default: [] })
  public pages!: Ref<PageClass>[];

  @Field(() => [String])
  @prop({ type: String, default: [] })
  public urls!: string[];
}

export interface StatementSourcesDocument
  extends DocumentType<StatementSourcesClass> {}

@ObjectType()
export class StatementVersionClass {
  @Field(() => [StringArrayClass])
  @prop({ type: () => StringArrayClass, default: [] })
  public stringArray!: StringArrayClass[];

  @Field(() => StatementSourcesClass)
  @prop({ type: () => StatementSourcesClass, default: {} })
  public sources!: StatementSourcesClass;

  @Field(() => [QuestionClass])
  @prop({ ref: "QuestionClass", default: [] })
  public questions!: Ref<QuestionClass>[];

  @Field()
  @prop({ default: new Date(), required: true })
  public createdAt!: Date;
}

export interface StatementVersionDocument
  extends DocumentType<StatementVersionClass> {}

@ObjectType()
export default class StatementClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: "PageClass", required: true })
  public page!: Ref<PageClass>;

  @Field(() => [StatementVersionClass])
  @prop({ type: () => StatementVersionClass, default: [] })
  public versions!: StatementVersionClass[];

  @Field()
  @prop({ default: true, required: true })
  public current!: boolean;

  public static async getByID(
    this: StatementModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions
  ) {
    return get.byID(this, id, options);
  }
}

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
export class Image {
  @Field()
  @prop({ required: true, trim: true })
  public name!: string;

  @Field()
  @prop({ trim: true })
  public sourceURL?: string;

  @Field()
  @prop({ trim: true })
  public caption?: string;
}

export interface ImageDocument extends DocumentType<Image> {}

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

  @Field(() => Image, { nullable: true })
  @prop({ type: () => Image, required: false })
  public image?: Image;
}

export interface StatementValueDocument
  extends DocumentType<StatementValueClass> {}

@ObjectType()
class StatementStyleClass {
  @Field()
  @prop({
    required: true,
    enum: ["mention", "variable", "quote", "bold", "image"],
  })
  public type!: "mention" | "variable" | "quote" | "bold" | "image";

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
  @prop({ required: false, trim: false })
  public string?: string;

  @Field(() => [StatementStyleClass])
  @prop({ type: () => StatementStyleClass, default: [] })
  public styles!: StatementStyleClass[];
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

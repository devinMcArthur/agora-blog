import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

import {
  PageClass,
  QuestionClass,
  StatementClass,
  VariableClass,
} from "@models";

@ObjectType()
export class Image {
  @Field()
  @prop({ required: true, trim: true })
  public name!: string;

  @Field({ nullable: true })
  @prop({ trim: true })
  public sourceURL?: string;

  @Field({ nullable: true })
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
  @prop({ ref: () => PageClass, required: false })
  public page?: Ref<PageClass>;

  @Field(() => StatementClass, { nullable: true })
  @prop({ ref: () => StatementClass, required: false })
  public statement?: Ref<StatementClass>;

  @Field(() => VariableClass, { nullable: true })
  @prop({ ref: () => VariableClass, required: false })
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
    enum: ["mention", "variable", "quote", "bold", "image", "italic"],
  })
  public type!: "mention" | "variable" | "quote" | "bold" | "image" | "italic";

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
  @prop({ ref: () => PageClass, default: [] })
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
  @prop({ ref: () => QuestionClass, default: [] })
  public questions!: Ref<QuestionClass>[];

  @Field()
  @prop({ default: new Date(), required: true })
  public createdAt!: Date;
}

export interface StatementVersionDocument
  extends DocumentType<StatementVersionClass> {}

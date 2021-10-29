import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

import {
  PageClass,
  ParagraphEditProposalClass,
  QuestionClass,
  StatementClass,
  VariableClass,
} from "@models";
import { StyleTypes } from "@typescript/models/Statement";

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
    enum: StyleTypes,
  })
  public type!: StyleTypes;

  @Field({ nullable: true })
  @prop({ required: false, enum: ["internal", "external"] })
  public variant?: "internal" | "external";

  @Field(() => StatementValueClass)
  @prop({ type: () => StatementValueClass, default: {} })
  public value!: StatementValueClass;
}

@ObjectType()
export class StringArrayClass {
  @Field({ nullable: true })
  @prop({ required: false, trim: false })
  public string?: string;

  @Field(() => [StatementStyleClass])
  @prop({ type: () => StatementStyleClass, default: [] })
  public styles!: StatementStyleClass[];
}

@ObjectType()
export class StatementVersionClass {
  @Field(() => [StringArrayClass])
  @prop({ type: () => StringArrayClass, default: [] })
  public stringArray!: StringArrayClass[];

  @Field(() => [QuestionClass])
  @prop({ ref: () => QuestionClass, default: [] })
  public questions!: Ref<QuestionClass>[];

  @Field(() => ParagraphEditProposalClass, { nullable: true })
  @prop({ ref: () => ParagraphEditProposalClass })
  public sourceEditProposal?: ParagraphEditProposalClass;

  @Field({ nullable: false })
  @prop({ default: Date.now, required: true, immutable: true })
  public createdAt!: Date;
}

export interface StatementVersionDocument
  extends DocumentType<StatementVersionClass> {}

import { Types } from "mongoose";
import { QuestionClass, StatementClass, StringArrayClass } from "@models";
import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { EditProposalChangeTypes } from "@typescript/models/ParagraphEditProposal";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class ParagraphEditProposalStatementClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field({ nullable: false })
  @prop({ required: true, enum: EditProposalChangeTypes })
  public changeType!: EditProposalChangeTypes;

  @Field(() => StatementClass, { nullable: true })
  @prop({ ref: () => StatementClass, required: false })
  public statement?: StatementClass;

  @Field(() => [StringArrayClass], { nullable: false })
  @prop({ type: () => StringArrayClass, required: true })
  public stringArray!: StringArrayClass[];

  @Field(() => [QuestionClass])
  @prop({ ref: () => QuestionClass, default: [] })
  public questions!: Ref<QuestionClass>[];

  @Field(() => [String])
  @prop({ default: [], type: String })
  public newQuestions!: string[];
}

export interface ParagraphEditProposalStatementDocument
  extends DocumentType<ParagraphEditProposalStatementClass> {}

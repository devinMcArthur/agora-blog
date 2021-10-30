import { Types } from "mongoose";
import {
  ParagraphStatementClass,
  QuestionClass,
  StatementClass,
  StringArrayClass,
} from "@models";
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

  @Field(() => ParagraphStatementClass, { nullable: true })
  @prop({ type: () => ParagraphStatementClass, required: false })
  public paragraphStatement?: ParagraphStatementClass;

  @Field(() => [StringArrayClass], { nullable: false })
  @prop({ type: () => StringArrayClass, required: true })
  public stringArray!: StringArrayClass[];

  @Field(() => StatementClass, { nullable: true })
  @prop({ ref: () => StatementClass })
  public quotedStatement?: Ref<StatementClass>;

  @Field(() => [QuestionClass])
  @prop({ ref: () => QuestionClass, default: [] })
  public questions!: Ref<QuestionClass>[];

  @Field(() => [String])
  @prop({ default: [], type: String })
  public newQuestions!: string[];
}

export interface ParagraphEditProposalStatementDocument
  extends DocumentType<ParagraphEditProposalStatementClass> {}

import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { PageClass, ParagraphEditProposalClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { ParagraphStatementClass } from "./subDocuments";
import SchemaVersions from "@constants/SchemaVersions";

export * from "./subDocuments";

@ObjectType()
export class ParagraphSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public page!: Ref<PageClass>;

  @Field(() => [ParagraphStatementClass])
  @prop({ type: () => ParagraphStatementClass, default: [] })
  public statements!: ParagraphStatementClass[];

  @Field()
  @prop({ type: Boolean, required: true, default: true })
  public mostRecent!: boolean;

  @Field(() => ParagraphEditProposalClass, { nullable: true })
  @prop({ ref: () => ParagraphEditProposalClass, required: false })
  public sourceEditProposal?: ParagraphEditProposalClass;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.Paragraph })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

import SchemaVersions from "@constants/SchemaVersions";
import { ParagraphClass, UserClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { ParagraphEditProposalStatementClass } from "./subDocuments";

export * from "./subDocuments";

@ObjectType()
export class ParagraphEditProposalSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => ParagraphClass, { nullable: false })
  @prop({ ref: () => ParagraphClass, required: true })
  public paragraph!: Ref<ParagraphClass>;

  @Field(() => UserClass, { nullable: false })
  @prop({ ref: () => UserClass, required: true })
  public author!: Ref<UserClass>;

  @Field({ nullable: false })
  @prop({ required: true })
  public description!: string;

  @Field(() => [ParagraphEditProposalStatementClass], { nullable: false })
  @prop({
    type: () => ParagraphEditProposalStatementClass,
    required: true,
  })
  public statementItems!: ParagraphEditProposalStatementClass[];

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.ParagraphEditProposal })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

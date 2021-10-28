import { StatementClass } from "@models";
import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ParagraphStatementClass {
  @Field({ nullable: false })
  @prop({ required: true })
  public versionIndex!: number;

  @Field(() => StatementClass, { nullable: false })
  @prop({ ref: () => StatementClass, required: true })
  public statement!: Ref<StatementClass>;
}

export interface ParagraphStatementDocument
  extends DocumentType<ParagraphStatementClass> {}

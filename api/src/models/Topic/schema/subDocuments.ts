import { DocumentType, prop, Ref } from "@typegoose/typegoose";
import PageClass from "../../../models/Page/class";
import StatementClass from "../../../models/Statement/class";
import VariableClass from "../../../models/Variable/class";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class TopicRow {
  @Field(() => [TopicColumn])
  @prop({ type: () => TopicColumn, default: [] })
  public columns!: TopicColumn[];
}

@ObjectType()
export class TopicColumn {
  @Field()
  @prop({
    required: true,
    enum: ["PAGE_HIGHLIGHT", "PAGE_LIST", "QUOTE", "VARIABLES"],
  })
  public type!: "PAGE_HIGHLIGHT" | "PAGE_LIST" | "QUOTE" | "VARIABLES";

  @Field({ nullable: true })
  @prop({ trim: true })
  public title?: string;

  @Field(() => PageClass, { nullable: true })
  @prop({ ref: () => PageClass })
  public page?: Ref<PageClass>;

  @Field(() => [PageClass])
  @prop({ ref: "PageClass" })
  public pages?: Ref<PageClass>[];

  @Field(() => StatementClass, { nullable: true })
  @prop({ ref: "StatementClass" })
  public statement?: Ref<StatementClass>;

  @Field(() => [VariableClass])
  @prop({ ref: "VariableClass" })
  public variables?: Ref<VariableClass>[];
}

export interface TopicColumnDocument extends DocumentType<TopicColumn> {}

import { PageClass, StatementVersionClass } from "@models";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

export * from "./subDocuments";

@ObjectType()
export class StatementSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public page!: Ref<PageClass>;

  @Field(() => [StatementVersionClass])
  @prop({ type: () => StatementVersionClass, default: [] })
  public versions!: StatementVersionClass[];

  @Field()
  @prop({ default: true, required: true })
  public current!: boolean;
}

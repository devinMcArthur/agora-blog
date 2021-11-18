import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import { PageClass, StatementClass, VariableClass } from "@models";
import SchemaVersions from "@constants/SchemaVersions";

@ObjectType()
export class VariablePageConnectionSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => VariableClass)
  @prop({ ref: () => VariableClass, required: true })
  public variable!: Ref<VariableClass>;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public referrerPage!: Ref<PageClass>;

  @Field(() => StatementClass)
  @prop({ ref: () => StatementClass, required: true })
  public statement!: Ref<StatementClass>;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.VariablePageConnection })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

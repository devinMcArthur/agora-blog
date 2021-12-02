import { post, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

import {
  Page,
  PageClass,
  PageConnectionDocument,
  StatementClass,
} from "@models";
import SchemaVersions from "@constants/SchemaVersions";

@post<PageConnectionDocument>("save", async (pageConnection) => {
  // Update pages based on connection
  await Page.updateForPageConnection(pageConnection);
})
@post<PageConnectionDocument>("remove", async (pageConnection) => {
  // Update pages based on connection
  await Page.updateForPageConnection(pageConnection);
})
@ObjectType()
export class PageConnectionSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public referencedPage!: Ref<PageClass>;

  @Field(() => PageClass)
  @prop({ ref: () => PageClass, required: true })
  public referrerPage!: Ref<PageClass>;

  @Field(() => [StatementClass])
  @prop({ ref: () => StatementClass, required: true })
  public statements!: Ref<StatementClass>[];

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.PageConnection })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

import SchemaVersions from "@constants/SchemaVersions";
import {
  PageClass,
  PageConnection,
  QuestionPageConnection,
  StatementDocument,
  StatementVersionClass,
  UserClass,
  VariablePageConnection,
} from "@models";
import { post, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

export * from "./subDocuments";

@post<StatementDocument>("save", async function (statement) {
  // handle page connection updates
  await PageConnection.updateForStatement(statement);

  // handle question page connections
  await QuestionPageConnection.updateForStatement(statement);

  // handle variable page connections
  await VariablePageConnection.updateForStatement(statement);
})
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

  @Field(() => UserClass)
  @prop({ ref: () => UserClass, required: true })
  public originalAuthor!: Ref<UserClass>;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.Statement })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}

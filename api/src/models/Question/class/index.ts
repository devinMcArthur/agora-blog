import { Types } from "mongoose";

import { Field, ID, ObjectType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import GetByIDOptions from "src/typescript/interface/getByID_Options";
import get from "./get";
import { QuestionDocument, QuestionModel } from "..";

@ObjectType()
export default class QuestionClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public question!: string;

  public static async getByID(
    this: QuestionModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public static async getList(this: QuestionModel) {
    return get.list(this);
  }

  public async getPagesThatReference(this: QuestionDocument) {
    return get.pagesThatReference(this);
  }

  public async getReferencedCount(this: QuestionDocument) {
    return get.referencedCount(this);
  }

  public async getStatementReferences(this: QuestionDocument) {
    return get.statementReferences(this);
  }
}

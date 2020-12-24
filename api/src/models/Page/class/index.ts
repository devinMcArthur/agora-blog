import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { prop, Ref, ReturnModelType } from "@typegoose/typegoose";

// import PageSchema from "../schema";
import get from "./get";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import ParagraphClass from "../../Paragraph/class";
import { PageDocument, PageModel } from "..";

@ObjectType()
export default class PageClass {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field()
  @prop({ required: true, trim: true })
  public slug!: string;

  @Field(() => [ParagraphClass])
  @prop({ ref: "ParagraphClass" })
  public paragraphs!: Ref<ParagraphClass>[];

  public static async getByID(
    this: PageModel,
    id: Types.ObjectId | string,
    options: GetByIDOptions = {}
  ) {
    return get.byID(this, id, options);
  }

  public static async getBySlug(
    this: PageModel,
    slug: string,
    options: GetByIDOptions = {}
  ) {
    return get.bySlug(this, slug, options);
  }

  public static async getList(this: PageModel) {
    return get.list(this);
  }

  public async getPagesThatReference(this: PageDocument) {
    return get.pagesThatReference(this);
  }

  public async getReferencedCount(this: PageDocument) {
    return get.referencedCount(this);
  }

  public async getStatementReferences(this: PageDocument) {
    return get.statementReferences(this);
  }
}

import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getById_Options";
import { PageConnectionDocument, PageDocument, PageModel } from "@models";

import get from "./get";
import create from "./create";
import { PageSchema } from "../schema";
import validate from "./validate";
import { IPageBuildData } from "@typescript/models/Page";
import build from "./build";
import schema_update from "./schema_update";
import update from "./update";
import { IListOptions } from "@typescript/interface/list_Options";

@ObjectType()
export class PageClass extends PageSchema {
  /**
   * CREATE
   */

  public static async create(this: PageModel, data: any) {
    return create.page(this, data);
  }

  /**
   * GET
   */

  public static async getById(
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

  public static async getList(
    this: PageModel,
    options?: IListOptions<PageDocument>
  ) {
    return get.list(this, options);
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

  public static async search(
    this: PageModel,
    searchString: string,
    limit?: number
  ) {
    return get.search(this, searchString, limit);
  }

  public async getDescription(this: PageDocument) {
    return get.description(this);
  }

  public async getCurrentParagraph(this: PageDocument) {
    return get.currentParagraph(this);
  }

  /**
   * ----- Build -----
   */

  public static async build(this: PageModel, data: IPageBuildData) {
    return build.build(this, data);
  }

  /**
   * ----- Update -----
   */

  public async updateReferencedCount(this: PageDocument) {
    return update.referencedCount(this);
  }

  public static async updateForPageConnection(
    this: PageModel,
    pageConnection: PageConnectionDocument
  ) {
    return update.forPageConnection(this, pageConnection);
  }
  /**
   * ----- Validate -----
   */

  public async validateDocument(this: PageDocument) {
    return validate.document(this);
  }

  /**
   * ----- Schema Update -----
   */

  public static async updateAllFromV1ToV2(this: PageModel) {
    return schema_update.allFromV1ToV2(this);
  }

  public async updateFromV1ToV2(this: PageDocument) {
    return schema_update.fromV1ToV2(this);
  }
}

import { Types } from "mongoose";
import { ObjectType } from "type-graphql";

import GetByIDOptions from "@typescript/interface/getByID_Options";
import { PageDocument, PageModel } from "@models";

import get from "./get";
import create from "./create";
import { PageSchema } from "../schema";

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

  public static async search(this: PageModel, searchString: string) {
    return get.search(this, searchString);
  }
}

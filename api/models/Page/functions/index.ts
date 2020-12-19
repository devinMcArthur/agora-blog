import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import PageSchema from "../schema";
import get, { PageGetByID, PageGetBySlug, PageGetList } from "./get";
import populate, { PagePopulateNormal, PagePopulateFull } from "./populate";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";

// DEFINE TYPES //

export interface PageDocument extends AgoraTypes.Page.Documents.Page {
  populateNormal: PagePopulateNormal;
  populateFull: PagePopulateFull;
}

export interface PageModel extends Model<PageDocument> {
  getByID: PageGetByID;
  getBySlug: PageGetBySlug;
  getRootPages: PageGetList;
}

// ADD FUNCTIONS TO SCHEMA //

// GET //

PageSchema.statics.getByID = async function (
  id: Types.ObjectId | string,
  options: GetByIDOptions
) {
  return get.byID(this, id, options);
};

PageSchema.statics.getBySlug = async function (
  slug: string,
  options: GetByIDOptions
) {
  return get.bySlug(this, slug, options);
};

PageSchema.statics.getList = async function () {
  return get.list(this);
};

// POPULATE //

PageSchema.methods.populateNormal = async function () {
  return populate.normal(this);
};

PageSchema.methods.populateFull = async function () {
  return populate.full(this);
};

export default PageSchema;

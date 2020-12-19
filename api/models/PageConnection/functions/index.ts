import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import PageConnectionSchema from "../schema";
import get, {
  PageConnectionGetPageReferencedCount,
  PageConnectionGetPagesThatReferencePage,
} from "./get";

// DEFINE TYPES //

export interface PageConnectionDocument
  extends AgoraTypes.PageConnection.Documents.PageConnection {}

export interface PageConnectionModel extends Model<PageConnectionDocument> {
  getPagesThatReferencePage: PageConnectionGetPagesThatReferencePage;
  getPageReferencedCount: PageConnectionGetPageReferencedCount;
}

// ADD FUNCTIONS TO SCHEMA //

// GET //

PageConnectionSchema.statics.getPagesThatReferencePage = async function (
  pageID: Types.ObjectId | string
) {
  return get.pagesThatReferencePage(this, pageID);
};

PageConnectionSchema.statics.getPageReferencedCount = async function (
  pageID: Types.ObjectId | string
) {
  return get.pageReferencedCount(this, pageID);
};

export default PageConnectionSchema;

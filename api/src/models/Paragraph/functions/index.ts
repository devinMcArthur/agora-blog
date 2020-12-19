import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import ParagraphSchema from "../schema";
import get, { ParagraphGetByID, ParagraphGetOptions } from "./get";
import populate, { ParagraphPopulateNormal } from "./populate";

// DEFINE TYPES //

export interface ParagraphDocument
  extends AgoraTypes.Paragraph.Documents.Paragraph {
  populateNormal: ParagraphPopulateNormal;
}

export interface ParagraphModel extends Model<ParagraphDocument> {
  getByID: ParagraphGetByID;
}

// ADD FUNCTIONS TO SCHEMA //

// GET //

ParagraphSchema.statics.getByID = async function (
  id: Types.ObjectId | string,
  options: ParagraphGetOptions
) {
  return get.byID(this, id, options);
};

// POPULATE //

ParagraphSchema.methods.populateNormal = async function () {
  return populate.normal(this);
};

export default ParagraphSchema;

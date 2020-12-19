import { Model } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import VariablePageConnectionSchema from "../schema";
import get, {
  VariablePageConnectionGetByVariableID,
  VariablePageConnectionGetPagesThatReferenceVariable,
} from "./get";

// DEFINE TYPES //

export interface VariablePageConnectionDocument
  extends AgoraTypes.VariablePageConnection.Documents.VariablePageConnection {}

export interface VariablePageConnectionModel
  extends Model<VariablePageConnectionDocument> {
  getByVariableID: VariablePageConnectionGetByVariableID;
  getPagesThatReferenceVariable: VariablePageConnectionGetPagesThatReferenceVariable;
}

// GET //

VariablePageConnectionSchema.statics.getByVariableID = async function (
  variableID: VariablePageConnectionGetByVariableID["arguments"]["variableID"]
) {
  return get.byVariableID(this, variableID);
};

VariablePageConnectionSchema.statics.getPagesThatReferenceVariable = async function (
  variableID: VariablePageConnectionGetPagesThatReferenceVariable["arguments"]["variableID"]
) {
  return get.pagesThatReferenceVariable(this, variableID);
};

export default VariablePageConnectionSchema;

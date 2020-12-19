import { Model, Types } from "mongoose";
import AgoraTypes from "@devin_mcarthur/agora-types";

import VariableSchema from "../schema";
import get, { VariableGetByID, VariableGetFinalValue } from "./get";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populate, {
  VariablePopulateFull,
  VariablePopulateNormal,
} from "./populate";

// DEFINE TYPES //

export interface VariableDocument
  extends AgoraTypes.Variable.Documents.Variable {
  populateNormal: VariablePopulateNormal;
  populateFull: VariablePopulateFull;
}

export interface VariableModel extends Model<VariableDocument> {
  getByID: VariableGetByID;
  getFinalValue: VariableGetFinalValue;
}

// GET //

VariableSchema.statics.getByID = async function (
  id: VariableGetByID["arguments"]["id"],
  options: VariableGetByID["arguments"]["options"]
) {
  return get.byID(this, id, options);
};

VariableSchema.statics.getFinalValue = async function (
  variableValue: VariableGetFinalValue["arguments"]["variableValue"]
) {
  return get.finalValue(this, variableValue);
};

// POPULATE //

VariableSchema.methods.populateNormal = async function () {
  return populate.normal(this);
};

VariableSchema.methods.populateFull = async function () {
  return populate.full(this);
};

export default VariableSchema;

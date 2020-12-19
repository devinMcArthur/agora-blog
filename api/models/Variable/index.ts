import * as mongoose from "mongoose";

import VariableSchema, {
  VariableModel as VM,
  VariableDocument as VD,
} from "./functions";

export interface VariableModel extends VM {}

export interface VariableDocument extends VD {}

export default mongoose.model<VD, VM>("Variable", VariableSchema);

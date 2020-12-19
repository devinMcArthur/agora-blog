import * as mongoose from "mongoose";

import VariablePageConnectionSchema, {
  VariablePageConnectionModel as VPCM,
  VariablePageConnectionDocument as VPCD,
} from "./functions";

export interface VariablePageConnectionModel extends VPCM {}

export interface VariablePageConnectionDocument extends VPCD {}

export default mongoose.model<VPCD, VPCM>(
  "VariablePageConnection",
  VariablePageConnectionSchema
);

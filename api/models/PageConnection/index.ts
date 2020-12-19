import * as mongoose from "mongoose";

import PageConnectionSchema, {
  PageConnectionModel as PCM,
  PageConnectionDocument as PCD,
} from "./functions";

export interface PageConnectionModel extends PCM {}

export interface PageConnectionDocument extends PCD {}

export default mongoose.model<PCD, PCM>("PageConnection", PageConnectionSchema);

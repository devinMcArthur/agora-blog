import * as mongoose from "mongoose";

import StatementSchema, {
  StatementModel as SM,
  StatementDocument as SD,
} from "./functions";

export interface StatementModel extends SM {}

export interface StatementDocument extends SD {}

export default mongoose.model<SD, SM>("Statement", StatementSchema);

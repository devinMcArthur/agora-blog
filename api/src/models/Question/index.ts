import * as mongoose from "mongoose";

import QuestionSchema, {
  QuestionModel as QM,
  QuestionDocument as QD,
} from "./functions";

export interface QuestionModel extends QM {}

export interface QuestionDocument extends QD {}

export default mongoose.model<QD, QM>("Question", QuestionSchema);

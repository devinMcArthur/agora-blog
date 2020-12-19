import * as mongoose from "mongoose";

import QuestionPageConnectionSchema, {
  QuestionPageConnectionModel as QPCM,
  QuestionPageConnectionDocument as QPCD,
} from "./functions";

export interface QuestionPageConnectionModel extends QPCM {}

export interface QuestionPageConnectionDocument extends QPCD {}

export default mongoose.model<QPCD, QPCM>(
  "QuestionPageConnection",
  QuestionPageConnectionSchema
);

import * as mongoose from "mongoose";

import ParagraphSchema, {
  ParagraphModel as PM,
  ParagraphDocument as PD,
} from "./functions";

export interface ParagraphModel extends PM {}

export interface ParagraphDocument extends PD {}

export default mongoose.model<PD, PM>("Paragraph", ParagraphSchema);

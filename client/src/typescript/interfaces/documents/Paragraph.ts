import { Types } from "mongoose";

import { SentencePopulated } from "./Sentence";

export default interface Paragraph {
  _id: Types.ObjectId;
  pageID: Types.ObjectId;
  sentences: Types.ObjectId[];
  version: number;
  mostRecent: boolean;
}

export interface ParagraphPopulated extends Omit<Paragraph, "sentences"> {
  sentences: SentencePopulated[];
}

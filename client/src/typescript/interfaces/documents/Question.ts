import { Types } from "mongoose";
import { PagePopulated } from "./Page";

export default interface Question {
  _id: Types.ObjectId;
  question: string;
}

export interface QuestionPopulated extends Question {
  relatedPages: PagePopulated[];
  referencedCount: number;
}

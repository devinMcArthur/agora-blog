import { Types } from "mongoose";

export default interface QuestionPageConnection {
  referrerPageID: Types.ObjectId;
  questionID: Types.ObjectId;
  sentenceID: Types.ObjectId;
}

import { Types } from "mongoose";

export default interface PageConnection {
  referencedPageID: Types.ObjectId;
  referrerPageID: Types.ObjectId;
  sentenceID: Types.ObjectId;
}

import { Types } from "mongoose";

export interface IPageConnectionData {
  statementId: Types.ObjectId | string;
  referrerPageId: Types.ObjectId | string;
  referencedPageId: Types.ObjectId | string;
}

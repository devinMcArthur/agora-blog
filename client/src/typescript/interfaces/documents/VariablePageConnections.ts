import { Types } from "mongoose";

export default interface VariablePageConnection {
  referrerPageID: Types.ObjectId;
  variableID: Types.ObjectId;
  sentenceID: Types.ObjectId;
}

import { Schema } from "mongoose";

const PageConnectionSchema = new Schema({
  referencedPageID: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
  referrerPageID: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
  statementID: {
    type: Schema.Types.ObjectId,
    ref: "Statement",
  },
});

export default PageConnectionSchema;

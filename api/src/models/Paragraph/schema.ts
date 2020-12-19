import { Schema } from "mongoose";

const ParagraphSchema = new Schema({
  pageID: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
  statements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Statement",
    },
  ],
  version: {
    type: Number,
    required: true,
  },
  mostRecent: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default ParagraphSchema;

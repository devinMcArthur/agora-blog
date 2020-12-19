import { Schema } from "mongoose";

const PageSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  paragraphVersionConnections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Paragraph",
    },
  ],
});

export default PageSchema;

import { Schema } from "mongoose";

const StatementSchema = new Schema({
  pageID: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
  versions: [
    {
      stringArray: [
        {
          string: {
            type: String,
            required: false,
          },
          styles: [
            {
              type: {
                type: String,
                enum: ["mention", "variable", "quote", "bold"],
                required: true,
              },
              variant: {
                type: String,
                required: false,
                enum: ["internal", "external"],
              },
              value: {
                pageID: {
                  type: Schema.Types.ObjectId,
                  ref: "Page",
                },
                url: {
                  type: String,
                },
                variableID: {
                  type: Schema.Types.ObjectId,
                  ref: "Variable",
                },
                statementID: {
                  type: Schema.Types.ObjectId,
                  ref: "Statement",
                },
              },
            },
          ],
        },
      ],
    },
  ],
  sources: {
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Page",
      },
    ],
    urls: [
      {
        type: String,
      },
    ],
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  current: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default StatementSchema;

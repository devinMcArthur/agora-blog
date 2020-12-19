import { Schema } from "mongoose";

const VariableSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  versions: [
    {
      type: {
        type: String,
        enum: ["number", "equation"],
        required: true,
      },
      number: {
        type: Number,
      },
      equation: [
        {
          type: {
            type: String,
            enum: ["operator", "number", "variable"],
            required: true,
          },
          operator: {
            type: String,
            enum: ["(", ")", "+", "-", "/", "*", "^"],
          },
          number: {
            type: Number,
          },
          variableID: {
            type: Schema.Types.ObjectId,
            ref: "Variable",
          },
        },
      ],
      sourceURL: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default VariableSchema;

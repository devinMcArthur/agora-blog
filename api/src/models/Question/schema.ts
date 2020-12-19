import { Schema } from "mongoose";

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
});

export default QuestionSchema;

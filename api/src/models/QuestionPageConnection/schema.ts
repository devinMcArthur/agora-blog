import { Schema } from "mongoose";

const QuestionPageConnectionSchema = new Schema({
  referrerPageID: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
  questionID: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  statementID: {
    type: Schema.Types.ObjectId,
    ref: "Statement",
  },
});

export default QuestionPageConnectionSchema;

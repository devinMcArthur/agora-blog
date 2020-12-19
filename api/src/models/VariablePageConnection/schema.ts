import { Schema } from "mongoose";

const VariablePageConnectionSchema = new Schema({
  referrerPageID: {
    type: Schema.Types.ObjectId,
    ref: "Page",
  },
  variableID: {
    type: Schema.Types.ObjectId,
    ref: "Variable",
  },
  statementID: {
    type: Schema.Types.ObjectId,
    ref: "Statement",
  },
});

export default VariablePageConnectionSchema;

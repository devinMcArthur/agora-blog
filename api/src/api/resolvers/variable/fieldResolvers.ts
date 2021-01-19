import { VariableDocument } from "src/models/Variable";

const finalValue = async (variable: VariableDocument) => {
  return await variable.getFinalValue();
};

const relatedPages = async (variable: VariableDocument) => {
  return await variable.getPagesThatReference({ fromCache: true });
};

export default { finalValue, relatedPages };

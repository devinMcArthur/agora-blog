import { Variable, VariableEquationDocument } from "@models";

const variable = async (variableEquation: VariableEquationDocument) => {
  return await Variable.getByID(variableEquation.variable!.toString());
};

export default { variable };

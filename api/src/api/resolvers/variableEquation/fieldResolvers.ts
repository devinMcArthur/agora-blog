import Variable from "../../../models/Variable";
import { VariableEquationDocument } from "../../../models/Variable/class";

const variable = async (variableEquation: VariableEquationDocument) => {
  return await Variable.getByID(variableEquation.variable!.toString(), {
    fromCache: true,
  });
};

export default { variable };

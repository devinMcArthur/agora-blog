import Variable from "../../../models/Variable";
import { VariableVersionDocument } from "../../../models/Variable/class";

const finalValue = async (variableVersion: VariableVersionDocument) => {
  return await Variable.getVersionsFinalValue(variableVersion);
};

export default { finalValue };

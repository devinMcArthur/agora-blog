import { Variable, VariableVersionDocument } from "@models";

const finalValue = async (variableVersion: VariableVersionDocument) => {
  return await Variable.getVersionsFinalValue(variableVersion);
};

export default { finalValue };

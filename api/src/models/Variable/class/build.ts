import { VariableDocument, VariableModel } from "@models";
import { IVariableBuildData } from "@typescript/models/Variable";

const build = (Variable: VariableModel, data: IVariableBuildData) => {
  return new Promise<VariableDocument>(async (resolve, reject) => {
    try {
      const variable = new Variable({
        ...data,
        versions: [data.version],
        originalAuthor: data.author,
      });

      await variable.validateDocument();

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};

import { Variable, VariableVersionClass } from "@models";

const getVariableVersionValue = (version: VariableVersionClass) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      switch (version.type) {
        case "number":
          resolve(version.number!);
          break;
        case "equation":
          let equation = "";
          for (let i = 0; i < version.equation.length; i++) {
            const item = version.equation[i];
            if (item.type === "number") {
              equation += item.number;
            } else if (item.type === "operator") {
              equation += item.operator;
            } else if (item.type === "variable") {
              const variable = await Variable.getById(
                item.variable!.toString()
              );
              equation += await Variable.getVersionsFinalValue(
                variable?.versions[variable?.versions.length - 1]!
              );
            }
          }
          resolve(eval(equation));
          break;
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default getVariableVersionValue;

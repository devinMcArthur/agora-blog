import { Variable, VariableEditProposal, VariableVersionClass } from "@models";
import isUrl from "./isUrl";

const validateVariableVersion = (version: VariableVersionClass) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!version) throw new Error("must provide a value for this version");

      if (version.sourceUrl && !isUrl(version.sourceUrl))
        throw new Error("must provide a valid source url");

      // validate source edit proposal
      if (version.sourceEditProposal) {
        const editProposal = await VariableEditProposal.getById(
          version.sourceEditProposal.toString()
        );
        if (!editProposal)
          throw new Error("could not find referenced variable edit proposal");
      }

      if (version.type === "number") {
        // validate number type

        if (version.number === undefined || isNaN(version.number))
          throw new Error("must provide a valid number");
      } else if (version.type === "equation") {
        // validate equation type

        if (!version.equation || version.equation.length < 1)
          throw new Error("must provide an equation object");

        let equation = "";
        for (let i = 0; i < version.equation.length; i++) {
          const equationItem = version.equation[i];

          switch (equationItem.type) {
            case "variable": {
              if (!equationItem.variable)
                throw new Error("must provide a variable reference");

              const fetchedVariable = await Variable.getById(
                equationItem.variable!.toString()
              );
              if (!fetchedVariable)
                throw new Error("unable to find referenced variable");

              if (
                fetchedVariable.versions[fetchedVariable.versions.length - 1]
                  .type !== "number"
              )
                throw new Error(
                  "can only reference variables that have type 'number'"
                );

              equation += await fetchedVariable.getFinalValue();

              break;
            }
            case "number": {
              if (
                equationItem.number === undefined ||
                isNaN(equationItem.number)
              )
                throw new Error("must provide a valid number");

              equation += equationItem.number;

              break;
            }
            case "operator": {
              equation += equationItem.operator;

              break;
            }
          }
        }

        let finalValue;
        try {
          finalValue = eval(equation);
        } catch (e) {
          throw new Error("this equation is invalid");
        }
        if (isNaN(finalValue)) throw new Error("this equation has no output");
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default validateVariableVersion;

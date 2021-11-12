import { User, Variable, VariableDocument } from "@models";
import isUrl from "@validation/isUrl";

const document = (variable: VariableDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // check for title
      if (!variable.title) throw new Error("must provide a title");

      // check for duplicate title
      const existingVariable = await Variable.getByTitle(variable.title);
      if (
        existingVariable &&
        existingVariable._id.toString() !== variable._id.toString()
      )
        throw new Error("a variable already exists with this title");

      // validate author
      if (!variable.originalAuthor) throw new Error("must provide an author");
      const author = await User.getById(variable.originalAuthor!.toString());
      if (!author)
        throw new Error("could not find the author of this variable");

      // ensure most recent version is valid
      const currentVersion = variable.versions[variable.versions.length - 1];

      if (currentVersion.sourceUrl && !isUrl(currentVersion.sourceUrl))
        throw new Error("must provide a valid source url");

      if (currentVersion.type === "number") {
        // validate number type

        if (currentVersion.number === undefined || isNaN(currentVersion.number))
          throw new Error("must provide a valid number");
      } else if (currentVersion.type === "equation") {
        // validate equation type

        if (!currentVersion.equation || currentVersion.equation.length < 1)
          throw new Error("must provide an equation object");

        let equation = "";
        for (let i = 0; i < currentVersion.equation.length; i++) {
          const equationItem = currentVersion.equation[i];

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

      // validate current version source url
      if (currentVersion.sourceUrl && !isUrl(currentVersion.sourceUrl))
        throw new Error("must provide a valid url for source");

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

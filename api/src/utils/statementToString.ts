import { StatementDocument, Statement, Variable } from "@models";
import { StyleTypes } from "@typescript/models/Statement";
import numberFormat from "./numberFormat";

const statementToString = (
  statement: StatementDocument,
  verionIndex?: number
) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      let index = verionIndex;
      if (index === undefined) index = statement.versions.length - 1;

      const currentVersion = statement.versions[index];

      if (currentVersion.quotedStatement) {
        const quotedStatement = await Statement.getById(
          currentVersion.quotedStatement.toString()
        );
        if (!quotedStatement) throw new Error("can not find quoted statement");

        resolve(await statementToString(quotedStatement));
        return;
      }

      let string = "";
      for (let i = 0; i < currentVersion.stringArray.length; i++) {
        const item = currentVersion.stringArray[i];

        for (let s = 0; s < item.styles.length; s++) {
          const style = item.styles[s];

          if (style.type === StyleTypes.variable) {
            // Handle variables
            const variable = await Variable.getById(
              style.value.variable!.toString()
            );

            if (variable)
              string += numberFormat(await variable.getFinalValue());
          } else if (style.type === StyleTypes.quote) {
            // Handle quotes
            const quoteStatement = await Statement.getById(
              style.value.statement!.toString()
            );

            if (quoteStatement)
              string += `"${await statementToString(quoteStatement)}"`;
          }
        }

        string += item.string;
      }

      resolve(string);
    } catch (e) {
      reject(e);
    }
  });
};

export default statementToString;

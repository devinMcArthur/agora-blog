import Statement from "../../models/Statement";
import VariablePageConnection from "../../models/VariablePageConnection";
import { VariablePageConnectionDocument } from "../../models/VariablePageConnection/functions";

const createVariablePageConnections = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const statements = await Statement.find({ current: true });
      let variablePageConnections: VariablePageConnectionDocument[] = [];

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        let statementsVariablePageConnections: VariablePageConnectionDocument[] = [];

        // Loop through stringArray
        for (
          let s = 0;
          s <
          statement.versions[statement.versions.length - 1].stringArray.length;
          s++
        ) {
          const stringArray =
            statement.versions[statement.versions.length - 1].stringArray[s];

          // Loop through styles
          for (let st = 0; st < stringArray.styles.length; st++) {
            const style = stringArray.styles[st];

            // Find all mentions
            if (style.type === "variable") {
              const variablePageConnection = new VariablePageConnection({
                referrerPageID: statement.pageID,
                variableID: style.value.variableID,
                statementID: statement._id,
              });

              variablePageConnections.push(variablePageConnection);
            }
          }
        }

        variablePageConnections = variablePageConnections.concat(
          statementsVariablePageConnections
        );
      }

      // Remove any duplicates from connections
      const checkedConnections: VariablePageConnectionDocument[] = [];
      variablePageConnections = variablePageConnections.filter((object) => {
        if (
          checkedConnections.find(
            (connection) =>
              connection.referrerPageID.toString() ===
                object.referrerPageID.toString() &&
              connection.variableID.toString() === object.variableID.toString()
          )
        ) {
          // Found a duplicate
          return false;
        }
        // No duplicate found, add to checkedConnections array
        checkedConnections.push(object);
        return true;
      });

      // Save all documents
      for (let i = 0; i < variablePageConnections.length; i++) {
        await variablePageConnections[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default createVariablePageConnections;

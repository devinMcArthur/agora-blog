import { Types } from "mongoose";
import {
  StatementDocument,
  VariableClass,
  VariablePageConnectionModel,
} from "@models";
import { Ref } from "@typegoose/typegoose";
import { StyleTypes } from "@typescript/models/Statement";
import { Console } from "console";

const forStatement = (
  VariablePageConnection: VariablePageConnectionModel,
  statement: StatementDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const referrerPage = statement.page;
      const existingConnections = await VariablePageConnection.getByStatement(
        statement
      );

      const getRequiredConnections = () => {
        const requiredConnections: Ref<VariableClass, Types.ObjectId>[] = [];

        const addRequiredConnections = (
          variableId: Ref<VariableClass, Types.ObjectId>
        ) => {
          if (requiredConnections.indexOf(variableId) === -1)
            requiredConnections.push(variableId);
        };

        // handle inline variables
        for (let i = 0; i < statement.currentVersion.stringArray.length; i++) {
          const stringArray = statement.currentVersion.stringArray[i];

          for (let s = 0; s < stringArray.styles.length; s++) {
            const style = stringArray.styles[s];

            // handle variables
            if (style.type === StyleTypes.variable && style.value.variable) {
              addRequiredConnections(style.value.variable);
            }
          }
        }

        return requiredConnections;
      };

      // remove all existing connections if statement is not current
      if (statement.current === false) {
        for (let i = 0; i < existingConnections.length; i++) {
          await existingConnections[i].remove();
        }

        resolve();
        return;
      }

      // get required connections
      const requiredConnections = getRequiredConnections();

      // get all the new connections
      const existingConnectionsMap = existingConnections.map((connection) =>
        connection.variable!.toString()
      );
      const newRequiredConnections = requiredConnections.filter(
        (connection) => {
          if (existingConnectionsMap.includes(connection.toString()))
            return false;
          else return true;
        }
      );

      // create all new connections
      for (let i = 0; i < newRequiredConnections.length; i++) {
        const variableId = newRequiredConnections[i];

        const variablePageConnection = new VariablePageConnection({
          variable: variableId,
          referrerPage,
          statement: statement._id,
        });

        try {
          await variablePageConnection.save();
        } catch (e) {
          console.error(e);
        }
      }

      // remove all old connections
      const requiredConnectionsMap = requiredConnections.map((connection) =>
        connection.toString()
      );
      const oldConnections = existingConnections.filter(
        (existingConnection) => {
          if (
            !requiredConnectionsMap.includes(
              existingConnection.variable!.toString()
            )
          )
            return true;
          else return false;
        }
      );
      for (let i = 0; i < oldConnections.length; i++) {
        const oldConnection = oldConnections[i];

        if (
          oldConnection.referrerPage!.toString() === referrerPage!.toString() &&
          oldConnection.statement!.toString() === statement._id.toHexString()
        ) {
          await oldConnection.remove();
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  forStatement,
};

import {
  StatementDocument,
  VariablePageConnectionDocument,
  VariablePageConnectionModel,
} from "@models";

const byStatement = (
  VariablePageConnection: VariablePageConnectionModel,
  statement: StatementDocument
) => {
  return new Promise<VariablePageConnectionDocument[]>(
    async (resolve, reject) => {
      try {
        const variablePageConnections = await VariablePageConnection.find({
          statement: statement._id,
        });

        resolve(variablePageConnections);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  byStatement,
};

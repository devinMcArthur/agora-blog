import { PageConnectionDocument, StatementDocument } from "@models";

const statement = (
  pageConnection: PageConnectionDocument,
  statement: StatementDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // if for some reason this connection doesn't have a statement, remove and return
      if (pageConnection.statements.length === 0) {
        await pageConnection.remove();

        throw new Error("this connection did not have any statements");
      }

      const statementIndex = pageConnection.statements.findIndex(
        (id) => id?.toString() === statement._id.toHexString()
      );

      // If statement doesn't belong, resolve promise and return
      if (statementIndex === -1) {
        throw new Error("statement doesn't belong to this connection");
      }

      // If this is the only statement, remove connection
      if (pageConnection.statements.length === 1) {
        await pageConnection.remove();

        throw new Error("that was the last statement, connection was removed");
      } else {
        // if we got to this point, remove statement from array

        pageConnection.statements.splice(statementIndex, 1);
      }

      await pageConnection.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  statement,
};

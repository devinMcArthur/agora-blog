import {
  PageConnectionDocument,
  PageConnectionModel,
  StatementDocument,
} from "@models";

const byStatement = (
  PageConnection: PageConnectionModel,
  statement: StatementDocument
) => {
  return new Promise<PageConnectionDocument[]>(async (resolve, reject) => {
    try {
      const pageConnections = await PageConnection.find({
        statement: statement._id,
      });

      resolve(pageConnections);
    } catch (e) {
      reject(e);
    }
  });
};

export default { byStatement };

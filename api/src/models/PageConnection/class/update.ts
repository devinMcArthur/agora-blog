import { Types } from "mongoose";

import { PageConnectionDocument } from "@models";

const addStatement = (
  pageConnection: PageConnectionDocument,
  statementId: Types.ObjectId
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingIndex = pageConnection.statements.findIndex(
        (id) => id?.toString() === statementId.toString()
      );

      if (existingIndex !== -1) pageConnection.statements.push(statementId);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  addStatement,
};

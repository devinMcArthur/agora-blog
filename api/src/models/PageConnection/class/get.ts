import { Types } from "mongoose";

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
        statements: statement._id,
      });

      resolve(pageConnections);
    } catch (e) {
      reject(e);
    }
  });
};

const byPages = (
  PageConnection: PageConnectionModel,
  referrerPageId: Types.ObjectId | string,
  referencedPageId: Types.ObjectId | string
) => {
  return new Promise<PageConnectionDocument | null>(async (resolve, reject) => {
    try {
      const pageConnections = await PageConnection.findOne({
        referencedPage: referencedPageId,
        referrerPage: referrerPageId,
      });

      resolve(pageConnections);
    } catch (e) {
      reject(e);
    }
  });
};

export default { byStatement, byPages };

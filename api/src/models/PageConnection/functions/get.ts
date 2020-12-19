import { Types } from "mongoose";
import { PageConnectionDocument } from ".";
import { PageConnectionModel } from "..";
import Page from "../../Page";
import { PageDocument } from "../../Page/functions";

export type PageConnectionGetPagesThatReferencePage = (
  pageID: Types.ObjectId | string
) => Promise<PageDocument[]>;
const pagesThatReferencePage = (
  PageConnection: PageConnectionModel,
  pageID: Types.ObjectId | string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageConnections: PageConnectionDocument[] = await PageConnection.find(
        { referencedPageID: pageID }
      );

      const pages: PageDocument[] = [];

      pageConnections.forEach(async (connection) => {
        const page = await Page.getByID(connection.referrerPageID);
        if (page) pages.push(page);
      });

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

export type PageConnectionGetPageReferencedCount = (
  pageID: Types.ObjectId | string
) => Promise<number>;
const pageReferencedCount = (
  PageConnection: PageConnectionModel,
  pageID: Types.ObjectId | string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await PageConnection.find({
        referencedPageID: pageID,
      }).countDocuments();

      resolve(count);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  pageReferencedCount,
  pagesThatReferencePage,
};

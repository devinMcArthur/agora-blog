import { Types } from "mongoose";

import Page, { PageModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import { PageDocument } from "..";
import PageConnection, { PageConnectionDocument } from "../../PageConnection";
import Statement, { StatementDocument } from "../../Statement";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byID = (
  Page: PageModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<PageDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const page = await Page.findById(id);

      if (!page && options.throwError) {
        throw new Error("Page.getByID: Unable to find page");
      }

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

const bySlugDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const bySlug = (
  Page: PageModel,
  slug: string,
  options: GetByIDOptions = bySlugDefaultOptions
): Promise<PageDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, bySlugDefaultOptions);
      const page = await Page.findOne({ slug });

      if (!page && options.throwError) {
        throw new Error("Page.getBySlug: Unable to find page");
      }

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

const list = (Page: PageModel): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const pages = await Page.find({});

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const pagesThatReference = (page: PageDocument): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageConnections: PageConnectionDocument[] = await PageConnection.find(
        {
          referencedPage: page._id,
        }
      );

      const pages: PageDocument[] = [];

      for (const connection of pageConnections) {
        const page = await Page.findById(connection.referrerPage);
        if (page) pages.push(page);
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const referencedCount = (page: PageDocument): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await PageConnection.find({
        referencedPage: page._id,
      }).countDocuments();

      resolve(count);
    } catch (e) {
      reject(e);
    }
  });
};

const statementReferences = (
  page: PageDocument
): Promise<StatementDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const statements = await Statement.find({
        current: true,
        "versions.-1.stringArray.styles.type": "mention",
        "versions.-1.stringArray.styles.variant": "mention",
        "versions.-1.stringArray.styles.value.pageID": page._id,
      });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  list,
  byID,
  bySlug,
  pagesThatReference,
  referencedCount,
  statementReferences,
};

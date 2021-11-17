import { Types } from "mongoose";

import {
  Page,
  PageModel,
  PageDocument,
  PageConnection,
  PageConnectionDocument,
  Statement,
  StatementDocument,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";

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
        throw new Error("Page.getById: Unable to find page");
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

const search = (
  Page: PageModel,
  searchString: string,
  limit?: number
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let reminaingLimit = limit || 250;

      /**
       * Partial Search
       */
      const partialSearch = async () => {
        const escapeRegex = (text: string) => {
          return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

        return Page.find({
          title: new RegExp(escapeRegex(searchString), "gi"),
        }).limit(reminaingLimit);
      };

      /**
       * Full Search
       */
      const fullSearch = async () => {
        // requires Atlas Search Index
        const aggregates = await Page.aggregate([
          {
            $search: {
              text: {
                query: searchString,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ]).limit(reminaingLimit);

        const pages: PageDocument[] = [];
        for (let i = 0; i < aggregates.length; i++) {
          const page = await Page.getById(aggregates[i]._id);
          if (page) pages.push(page);
        }

        return pages;
      };

      /**
       * Final Combination
       */

      let pages: PageDocument[] = await fullSearch();
      if (pages.length < 1) {
        pages = await partialSearch();
      }

      resolve(pages);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const pagesThatReference = (page: PageDocument): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      let pages: PageDocument[] = [];

      const pageConnections: PageConnectionDocument[] =
        await PageConnection.find({
          referencedPage: page._id,
        });

      for (const connection of pageConnections) {
        const page = await Page.getById(connection.referrerPage!.toString());
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
  search,
  pagesThatReference,
  referencedCount,
  statementReferences,
};

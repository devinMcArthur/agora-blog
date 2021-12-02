import { Types } from "mongoose";

import {
  Page,
  PageModel,
  PageDocument,
  PageConnection,
  PageConnectionDocument,
  Statement,
  StatementDocument,
  ParagraphDocument,
  Paragraph,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";
import { IListOptions } from "@typescript/interface/list_Options";
import statementToString from "@utils/statementToString";

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

const listDefaultOptions: IListOptions<PageDocument> = {
  pageLimit: 9,
  offset: 0,
};
const list = (
  Page: PageModel,
  options?: IListOptions<PageDocument>
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      const pages = await Page.find(options?.query || {}, undefined, {
        limit: options?.pageLimit,
        skip: options?.offset,
        sort: {
          referencedCount: -1,
          createdAt: -1,
          title: -1,
        },
      });

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
      // let pages: PageDocument[] = [];

      const pageConnections: PageConnectionDocument[] =
        await PageConnection.find({
          referencedPage: page._id,
        });

      const pages = await Page.getList({
        query: {
          _id: {
            $in: pageConnections.map((connection) =>
              connection.referrerPage!.toString()
            ),
          },
        },
        pageLimit: 50,
      });

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

const currentParagraph = (page: PageDocument) => {
  return new Promise<ParagraphDocument>(async (resolve, reject) => {
    try {
      const paragraph = await Paragraph.getById(
        page.paragraphs[page.paragraphs.length - 1]!.toString()
      );

      if (!paragraph) throw new Error("could not find pages current paragraph");

      resolve(paragraph);
    } catch (e) {
      reject(e);
    }
  });
};

const description = (page: PageDocument) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const currentParagraph = await page.getCurrentParagraph();

      const firstStatement = await Statement.getById(
        currentParagraph.statements[0].statement!.toString()
      );
      if (!firstStatement) throw new Error("Could not find first statement");

      resolve(
        await statementToString(
          firstStatement,
          currentParagraph.statements[0].versionIndex
        )
      );
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
  description,
  currentParagraph,
  pagesThatReference,
  referencedCount,
  statementReferences,
};

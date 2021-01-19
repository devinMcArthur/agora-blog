import { Types } from "mongoose";

import Page, { PageModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import { PageDocument } from "..";
import PageConnection, { PageConnectionDocument } from "../../PageConnection";
import Statement, { StatementDocument } from "../../Statement";
import performCacheQuery from "../../../utils/performCacheQuery";
import { dispatch } from "nact";
import { cacheService } from "../../../server";
import isEmpty from "../../../validation/isEmpty";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  Page: PageModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<PageDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let page: PageDocument | null = null;
      if (options.fromCache) {
        const cachedPage = await performCacheQuery({
          path: ["pages"],
          type: "GET_PAGE",
          payload: { pageID: id },
        });
        if (!isEmpty(cachedPage)) {
          page = new Page(cachedPage);
        } else {
          dispatch(cacheService, {
            path: ["pages"],
            type: "SET_PAGE",
            payload: { pageID: id },
          });
        }
      }

      if (!page) page = await Page.findById(id);

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
  fromCache: false,
};
const bySlug = (
  Page: PageModel,
  slug: string,
  options: GetByIDOptions = bySlugDefaultOptions
): Promise<PageDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, bySlugDefaultOptions);

      let page: PageDocument | null = null;
      if (options.fromCache) {
        const cachedID = await performCacheQuery({
          path: ["page_slugs"],
          type: "GET_ID",
          payload: { slug },
        });
        if (cachedID) {
          page = await Page.getByID(cachedID, { fromCache: true });
        } else {
          page = await Page.findOne({ slug });
          if (page)
            dispatch(cacheService, {
              path: ["page_slugs"],
              type: "ADD_ID",
              payload: {
                slug,
                id: page._id,
              },
            });
        }
      }

      if (!page) page = await Page.findOne({ slug });

      if (!page && options.throwError) {
        throw new Error("Page.getBySlug: Unable to find page");
      }

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

const listDefaultOptions = {
  fromCache: false,
};
const list = (
  Page: PageModel,
  options = listDefaultOptions
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      let pages: PageDocument[] = [];
      if (options.fromCache) {
        const cachedPageIDs = await performCacheQuery({
          path: ["page_list"],
          type: "GET_LIST",
        });
        if (cachedPageIDs.length > 0) {
          for (let i = 0; i < cachedPageIDs.length; i++) {
            const page = await Page.getByID(cachedPageIDs[i], {
              fromCache: true,
            });
            if (page) pages[i] = page;
          }
        } else {
          dispatch(cacheService, {
            path: ["page_list"],
            type: "SET_LIST",
          });
        }
      }

      if (pages.length === 0) {
        pages = await Page.find({});
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const pagesThatReferenceDefaultOptions = {
  fromCache: false,
};
const pagesThatReference = (
  page: PageDocument,
  options = pagesThatReferenceDefaultOptions
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, pagesThatReferenceDefaultOptions);

      let pages: PageDocument[] = [];
      if (options.fromCache) {
        const cachedPage = await performCacheQuery({
          path: ["pages"],
          type: "GET_PAGE",
          payload: { pageID: page._id },
        });
        if (cachedPage.relatedPages) {
          for (let i = 0; i < cachedPage.relatedPages.length; i++) {
            pages[i] = new Page(cachedPage.relatedPages[i]);
          }
        } else {
          dispatch(cacheService, {
            path: ["pages"],
            type: "SET_PAGE",
            payload: { pageID: page._id },
          });
        }
      }

      if (pages.length === 0) {
        const pageConnections: PageConnectionDocument[] = await PageConnection.find(
          {
            referencedPage: page._id,
          }
        );

        for (const connection of pageConnections) {
          const page = await Page.getByID(connection.referrerPage!.toString(), {
            fromCache: options.fromCache,
          });
          if (page) pages.push(page);
        }
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const referencedCountDefaultOptions = {
  fromCache: false,
};
const referencedCount = (
  page: PageDocument,
  options = referencedCountDefaultOptions
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, referencedCountDefaultOptions);

      let count: number = 0;
      if (options.fromCache) {
        const cachePage = await performCacheQuery({
          path: ["pages"],
          type: "GET_PAGE",
          payload: { pageID: page._id },
        });
        if (cachePage.referencedCount) {
          count = cachePage.referencedCount;
        } else {
          dispatch(cacheService, {
            path: ["pages"],
            type: "SET_PAGE",
            payload: { pageID: page._id },
          });
        }
      }

      if (count === 0) {
        count = await PageConnection.find({
          referencedPage: page._id,
        }).countDocuments();
      }

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

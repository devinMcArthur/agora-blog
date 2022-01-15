import ElasticsearchClient from "../../client";
import { PageDocument } from "@models";
import { logger } from "@logger";
import { ES_ensurePageSettings } from "./settings";
import { ES_ensurePageMapping } from "./mapping";

export const ES_ensurePageIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensurePageSettings();
      await ES_ensurePageMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updatePage = (page: PageDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Updating page ${page._id} in ES`);
      await ElasticsearchClient.update({
        index: "page",
        id: page._id.toString(),
        body: {
          doc: {
            page: {
              title: page.title,
            },
          },
          doc_as_upsert: true,
        },
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

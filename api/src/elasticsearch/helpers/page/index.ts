import ElasticsearchClient from "../../client";
import { PageDocument } from "@models";
import PageMapping from "../../mappings/page.json";
import _ from "lodash";
import { logger } from "@logger";

export const ES_ensurePageIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: "page",
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating page ES index");
        await ElasticsearchClient.indices.create({
          index: "page",
          body: {
            mappings: PageMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: "page",
          })
        ).body["page"].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(PageMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating page ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: "page",
            body: PageMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updatePage = (page: PageDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensurePageIndex();

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

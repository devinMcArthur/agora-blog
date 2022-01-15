import _ from "lodash";

import ElasticsearchClient from "../../client";
import { logger } from "@logger";
import PageMapping from "../../mappings/page.json";

export * from "./settings";

export const ES_ensurePageMapping = () => {
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

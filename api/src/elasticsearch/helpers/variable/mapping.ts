import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";
import { logger } from "@logger";

import VariableMapping from "../../mappings/variable.json";

export const ES_ensureVariableMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: "variable",
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating variable ES index");
        await ElasticsearchClient.indices.create({
          index: "variable",
          body: {
            mappings: VariableMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: "variable",
          })
        ).body["variable"].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(VariableMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating variable ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: "variable",
            body: VariableMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

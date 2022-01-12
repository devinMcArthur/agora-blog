import ElasticsearchClient from "@elasticsearch/client";
import { logger } from "@logger";
import { VariableDocument } from "@models";
import _ from "lodash";

import VariableMapping from "../../mappings/variable.json";

export const ES_ensureVariableIndex = () => {
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

export const ES_updateVariable = (variable: VariableDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureVariableIndex();

      logger.debug(`Updating variable ${variable._id} in ES`);
      await ElasticsearchClient.update({
        index: "variable",
        id: variable._id.toString(),
        body: {
          doc: {
            variable: {
              title: variable.title,
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

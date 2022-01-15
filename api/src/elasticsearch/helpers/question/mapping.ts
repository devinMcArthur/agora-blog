import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";
import { logger } from "@logger";

import QuestionMapping from "../../mappings/question.json";

export const ES_ensureQuestionMapping = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: "question",
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping

        logger.info("Creating question ES index");
        await ElasticsearchClient.indices.create({
          index: "question",
          body: {
            mappings: QuestionMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches

        const currentMapping = (
          await ElasticsearchClient.indices.getMapping({
            index: "question",
          })
        ).body["question"].mappings;

        if (
          !_.isEqual(
            JSON.parse(JSON.stringify(currentMapping)),
            JSON.parse(JSON.stringify(QuestionMapping))
          )
        ) {
          // Mappings do not match, update ES map

          logger.info("Updating question ES index mapping");
          await ElasticsearchClient.indices.putMapping({
            index: "question",
            body: QuestionMapping,
          });
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

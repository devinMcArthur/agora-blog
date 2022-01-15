import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";
import { logger } from "@logger";
import { QuestionDocument } from "@models";
import { ES_ensureQuestionMapping } from "./mapping";
import { ES_ensureQuestionSettings } from "./settings";

export const ES_ensureQuestionIndex = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensureQuestionSettings();
      await ES_ensureQuestionMapping();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export const ES_updateQuestion = (question: QuestionDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      logger.debug(`Updating question ${question._id} in ES`);
      await ElasticsearchClient.update({
        index: "question",
        id: question._id.toString(),
        body: {
          doc: {
            question: {
              question: question.question,
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

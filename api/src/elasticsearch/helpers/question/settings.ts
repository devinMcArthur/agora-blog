import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";

import QuestionSettings from "../../settings/question.json";

export const ES_ensureQuestionSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({ index: "question" })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({ index: "question" });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({ index: "question" });
      await ElasticsearchClient.indices.putSettings({
        index: "question",
        body: {
          max_ngram_diff: 20,
          ...QuestionSettings,
        },
      });
      await ElasticsearchClient.indices.open({ index: "question" });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

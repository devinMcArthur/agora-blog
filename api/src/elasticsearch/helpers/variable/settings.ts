import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";

import VariableSettings from "../../settings/variable.json";

export const ES_ensureVariableSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({ index: "variable" })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({ index: "variable" });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({ index: "variable" });
      await ElasticsearchClient.indices.putSettings({
        index: "variable",
        body: {
          max_ngram_diff: 20,
          ...VariableSettings,
        },
      });
      await ElasticsearchClient.indices.open({ index: "variable" });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

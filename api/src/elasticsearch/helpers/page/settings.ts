import _ from "lodash";

import ElasticsearchClient from "@elasticsearch/client";

import PageSettings from "../../settings/page.json";

export const ES_ensurePageSettings = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({ index: "page" })
      ).body;

      if (!exists) {
        await ElasticsearchClient.indices.create({ index: "page" });
      }

      // Put Settings
      await ElasticsearchClient.indices.close({ index: "page" });
      await ElasticsearchClient.indices.putSettings({
        index: "page",
        body: {
          max_ngram_diff: 20,
          ...PageSettings,
        },
      });
      await ElasticsearchClient.indices.open({ index: "page" });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

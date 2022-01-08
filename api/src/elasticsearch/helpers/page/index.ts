import ElasticsearchClient from "../../client";
import { PageDocument } from "@models";
import PageMapping from "../../mappings/page.json";

export const ES_updatePage = (page: PageDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const exists = (
        await ElasticsearchClient.indices.exists({
          index: "page",
        })
      ).body;

      if (exists === false) {
        // If no index exists, create with mapping
        await ElasticsearchClient.indices.create({
          index: "page",
          body: {
            mappings: PageMapping,
          },
        });
      } else {
        // If exists, ensure mapping matches
      }

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

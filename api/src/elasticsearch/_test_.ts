import { Page } from "@models";
import _ids from "@testing/_ids";
import ElasticsearchClient from "./client";

const elasticsearchTesting = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: "page",
        body: {
          query: {
            bool: {
              must: [
                {
                  match: {
                    "page.title": "covid test",
                  },
                },
              ],
            },
          },
        },
      });
      console.log(res.body.hits.hits.map((item: any) => item._source));

      const page = (await Page.getById(_ids.pages.page_covid_19_masks._id))!;

      page.title = "Spotify";
      await page.save();

      setTimeout(async () => {
        const newRes = await ElasticsearchClient.search({
          index: "page",
          body: {
            query: {
              bool: {
                must: [
                  {
                    match: {
                      "page.title": {
                        query: "spotTify",
                        fuzziness: "AUTO",
                      },
                    },
                  },
                ],
              },
            },
          },
        });

        console.log(newRes.body.hits);
        console.log(newRes.body.hits.hits.map((item: any) => item._source));
      }, 1000);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default elasticsearchTesting;

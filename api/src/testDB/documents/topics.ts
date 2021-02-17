import _ids from "../_ids";

import Topic, { TopicDocument } from "../../models/Topic";

export interface SeededTopics {
  topic_covid_19: TopicDocument;
}

const createTopics = () => {
  return new Promise<SeededTopics>(async (resolve, reject) => {
    try {
      const topic_covid_19 = new Topic({
        _id: _ids.topics.covid_id_topic._id,
        title: "COVID-19",
        slug: "COVID-19",
        rows: [
          {
            columns: [
              {
                type: "PAGE_HIGHLIGHT",
                page: _ids.pages.page_covid_2019._id,
              },
            ],
          },
          {
            columns: [
              {
                type: "VARIABLES",
                variables: [
                  _ids.variables.var_global_cases_covid_19._id,
                  _ids.variables.var_global_deaths_covid_19._id,
                  _ids.variables.var_covid_19_rt_pcr_test_false_negative_rate
                    ._id,
                ],
              },
            ],
          },
          {
            columns: [
              {
                type: "PAGE_LIST",
                title: "General",
                pages: [
                  _ids.pages.page_sars_cov_2._id,
                  _ids.pages.page_covid_19_transmission._id,
                  _ids.pages.page_covid_19_symptoms._id,
                  _ids.pages.page_covid_19_pandemic._id,
                  _ids.pages.page_covid_19_masks._id,
                  _ids.pages.page_covid_19_deaths._id,
                ],
              },
              {
                type: "PAGE_LIST",
                title: "Testing",
                pages: [
                  _ids.pages.page_covid_19_testing._id,
                  _ids.pages.page_covid_19_rt_pcr_test._id,
                  _ids.pages.page_rt_pcr_cycle_threshold._id,
                ],
              },
            ],
          },
          {
            columns: [
              {
                type: "QUOTE",
                statement:
                  _ids.pages.page_covid_19_testing.paragraphs[0].statements[4],
              },
            ],
          },
        ],
      });

      const topics = {
        topic_covid_19,
      };

      for (let i = 0; i < Object.values(topics).length; i++) {
        await Object.values(topics)[i].save();
      }

      resolve(topics);
    } catch (e) {
      reject(e);
    }
  });
};

export default createTopics;

import _ids from "../../_ids";

import Statement from "../../../models/Statement";

const page_covid_2019_sentence_1_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[0],
  pageID: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "A contagious disease caused by ",
          styles: [],
        },
        {
          string:
            "severe actute respiratory syndrome coronavirus 2 (SARS-CoV-2)",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                pageID: _ids.pages.page_sars_cov_2._id,
              },
            },
          ],
        },
        {
          string: ".",
          styles: [],
        },
      ],
    },
  ],
  questions: [_ids.questions.what_is_covid_19._id],
});

const page_covid_2019_sentence_2_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[1],
  pageID: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "The first case of this disease was reported by officials in Wuhan, China, in December 2019.",
          styles: [],
        },
      ],
    },
  ],
  sources: {
    urls: [
      "https://www.who.int/docs/default-source/coronaviruse/situation-reports/20200423-sitrep-94-covid-19.pdf#:~:text=The%20first%20human%20cases%20of,%2C%20in%20December%202019.",
    ],
  },
  questions: [_ids.questions.where_was_the_first_case_of_covid_19._id],
});

const page_covid_2019_sentence_3_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[2],
  pageID: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "",
          styles: [
            {
              type: "quote",
              value: {
                sentenceID:
                  _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[0],
              },
            },
          ],
        },
      ],
    },
  ],
  questions: [],
});

const page_covid_2019_sentence_4_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[3],
  pageID: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "",
          styles: [
            {
              type: "quote",
              value: {
                sentenceID:
                  _ids.pages.page_covid_19_transmission.paragraphs[0]
                    .statements[0],
              },
            },
          ],
        },
      ],
    },
  ],
  questions: [],
});

const page_covid_2019_sentence_5_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[4],
  pageID: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "",
          styles: [
            {
              type: "quote",
              value: {
                sentenceID:
                  _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
              },
            },
          ],
        },
      ],
    },
  ],
  questions: [],
});

const statements = [
  page_covid_2019_sentence_1_v1,
  page_covid_2019_sentence_2_v1,
  page_covid_2019_sentence_3_v1,
  page_covid_2019_sentence_4_v1,
  page_covid_2019_sentence_5_v1,
];

export default statements;

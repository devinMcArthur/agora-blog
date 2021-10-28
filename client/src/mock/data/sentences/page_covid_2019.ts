import _ids from "../_ids";

import Sentence from "../../../typescript/interfaces/documents/Sentence";

const page_covid_2019_sentence_1_v1: Sentence = {
  _id: _ids.pages.page_covid_2019.paragraphs[0].sentences[0],
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
  questionConnections: [{ questionID: _ids.questions.what_is_covid_19._id }],
};

const page_covid_2019_sentence_2_v1: Sentence = {
  _id: _ids.pages.page_covid_2019.paragraphs[0].sentences[1],
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
  questionConnections: [
    {
      questionID: _ids.questions.where_was_the_first_case_of_covid_19._id,
    },
  ],
};

const page_covid_2019_sentence_3_v1: Sentence = {
  _id: _ids.pages.page_covid_2019.paragraphs[0].sentences[2],
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
                  _ids.pages.page_covid_19_symptoms.paragraphs[0].sentences[0],
              },
            },
          ],
        },
      ],
    },
  ],
  questionConnections: [],
};

const page_covid_2019_sentence_4_v1: Sentence = {
  _id: _ids.pages.page_covid_2019.paragraphs[0].sentences[3],
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
                    .sentences[0],
              },
            },
          ],
        },
      ],
    },
  ],
  questionConnections: [],
};

const page_covid_2019_sentence_5_v1: Sentence = {
  _id: _ids.pages.page_covid_2019.paragraphs[0].sentences[4],
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
                  _ids.pages.page_covid_19_deaths.paragraphs[0].sentences[1],
              },
            },
          ],
        },
      ],
    },
  ],
  questionConnections: [],
};

const sentences = [
  page_covid_2019_sentence_1_v1,
  page_covid_2019_sentence_2_v1,
  page_covid_2019_sentence_3_v1,
  page_covid_2019_sentence_4_v1,
  page_covid_2019_sentence_5_v1,
];

export default sentences;

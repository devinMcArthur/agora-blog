import _ids from "../_ids";

import Sentence from "../../../typescript/interfaces/documents/Sentence";

const page_covid_19_deaths_sentence_1_v1: Sentence = {
  _id: _ids.pages.page_covid_19_deaths.paragraphs[0].sentences[0],
  pageID: _ids.pages.page_covid_19_deaths._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-05"),
      stringArray: [
        {
          string:
            "Although the method of defining a death differs around the world, official deaths from ",
          styles: [],
        },
        {
          string: "COVID-19",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                pageID: _ids.pages.page_covid_2019._id,
              },
            },
          ],
        },
        {
          string:
            " generally refer to people who died after testing positive according to protocols, although this may ignore deaths of people who died without being tested, or may over-count tose who have died from underlying conditions but tested positive for the disease.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    { questionID: _ids.questions.what_counts_as_a_covid_19_death._id },
  ],
};

const page_covid_19_deaths_sentence_2_v1: Sentence = {
  _id: _ids.pages.page_covid_19_deaths.paragraphs[0].sentences[1],
  pageID: _ids.pages.page_covid_19_deaths._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "As of this moment, more than ",
          styles: [],
        },
        {
          string: "",
          styles: [
            {
              type: "variable",
              value: {
                variableID: _ids.variables.var_global_cases_covid_19._id,
              },
            },
          ],
        },
        {
          string: " deaths have been attributed to COVID-19.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.how_many_covid_19_deaths_have_there_been._id,
    },
  ],
};

const page_covid_19_deaths_sentence_3_v1: Sentence = {
  _id: _ids.pages.page_covid_19_deaths.paragraphs[0].sentences[2],
  pageID: _ids.pages.page_covid_19_deaths._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Those with underlying conditions, such as those with weak immune systems, serious heart of lung problems, severe obesity, or the elderly with underlying conditions have the highest mortality rate from this disease.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.who_is_most_likely_to_die_from_covid_19._id,
    },
  ],
};

const sentences = [
  page_covid_19_deaths_sentence_1_v1,
  page_covid_19_deaths_sentence_2_v1,
  page_covid_19_deaths_sentence_3_v1,
];

export default sentences;

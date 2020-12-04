import _ids from "../_ids";

import Sentence from "../../../typescript/interfaces/documents/Sentence";

const page_covid_19_symptoms_sentence_1_v1: Sentence = {
  _id: _ids.pages.page_covid_19_symptoms.paragraphs[0].sentences[0],
  pageID: _ids.pages.page_covid_19_symptoms._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "Transmission of ",
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
          string:
            " is thought to come from a number of factors; initially thought to primarily occur via respiratory droplets from coughts and sneezes, other studies have also shown that the virus may be airborne, spreading from aerosols, indirect contact via contaminated surfaces is another possible cause of infection with preliminary research indicating that the virus may remain viable on plastic and steel for up to three days.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    { questionID: _ids.questions.how_is_sars_cov_2_transmitted._id },
  ],
};

const page_covid_19_symptoms_sentence_2_v1: Sentence = {
  _id: _ids.pages.page_covid_19_symptoms.paragraphs[0].sentences[1],
  pageID: _ids.pages.page_covid_19_symptoms._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "This virus has been confirmed to be spread by asymptomatic cases.",
          styles: [],
        },
      ],
    },
  ],
  sources: {
    urls: [
      {
        url: "https://onlinelibrary.wiley.com/doi/full/10.1111/irv.12743",
      },
    ],
  },
  questionConnections: [
    {
      questionID:
        _ids.questions.does_sars_cov_2_spread_from_asymptomatic_cases._id,
    },
  ],
};

const page_covid_19_symptoms_sentence_3_v1: Sentence = {
  _id: _ids.pages.page_covid_19_symptoms.paragraphs[0].sentences[2],
  pageID: _ids.pages.page_covid_19_symptoms._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Although it is confirmed that asyptomatic cases are able to spread the virus, they will transmit the virus to significatly fewer people than someone with symptoms so researchers are divided about whether these cases are acting as 'silent drivers' of the pandemic.",
          styles: [],
        },
      ],
    },
  ],
  sources: {
    urls: [
      {
        url: "https://www.nature.com/articles/d41586-020-03141-3",
      },
    ],
  },
  questionConnections: [
    {
      questionID:
        _ids.questions
          .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread._id,
    },
  ],
};

const sentences = [
  page_covid_19_symptoms_sentence_1_v1,
  page_covid_19_symptoms_sentence_2_v1,
  page_covid_19_symptoms_sentence_3_v1,
];

export default sentences;

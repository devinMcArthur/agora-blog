import _ids from "../_ids";

import Sentence from "../../../typescript/interfaces/documents/Sentence";

const page_covid_19_pandemic_sentence_1_v1: Sentence = {
  _id: _ids.pages.page_covid_19_pandemic.paragraphs[0].sentences[0],
  pageID: _ids.pages.page_covid_19_pandemic._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "The COVID-19 pandemic is an ongoing pandemic of ",
          styles: [],
        },
        {
          string: "coronavirus 2019",
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
          string: ", with the ",
          styles: [],
        },
        {
          string: "WHO",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://en.wikipedia.org/wiki/World_Health_Organization",
              },
            },
          ],
        },
        {
          string:
            " declaring the outbreak a Public Health Emergency of International Concern in January 2020 and a pandemic in March 2020.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    { questionID: _ids.questions.what_is_the_covid_19_pandemic._id },
  ],
};

const sentences = [page_covid_19_pandemic_sentence_1_v1];

export default sentences;

import _ids from "../../_ids";

import Statement from "../../../models/Statement";

const page_covid_19_symptoms_sentence_1_v1 = new Statement({
  _id: _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[0],
  pageID: _ids.pages.page_covid_19_symptoms._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "Common symptoms of ",
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
            " include fever, cough, fatigue, breathing difficulties, and loss of smell and taste; these symptoms often begin one to fourteen days after getting the virus.",
          styles: [],
        },
      ],
    },
  ],
  questions: [_ids.questions.what_are_the_common_symptoms_of_covid_19._id],
});

const page_covid_19_symptoms_sentence_2_v1 = new Statement({
  _id: _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[1],
  pageID: _ids.pages.page_covid_19_symptoms._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "While most people have mild symptoms, some people develop ",
          styles: [],
        },
        {
          string: "acute respiratory distress syndrome (ARDS)",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url:
                  "https://en.wikipedia.org/wiki/Acute_respiratory_distress_syndrome",
              },
            },
          ],
        },
        {
          string: ", precipitated by ",
          styles: [],
        },
        {
          string: "cytokine storms",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://en.wikipedia.org/wiki/Cytokine_storm",
              },
            },
          ],
        },
        {
          string: ", multi-organ failure, septic shock, and blood clots.",
          styles: [],
        },
      ],
    },
  ],
  questions: [_ids.questions.why_is_covid_19_dangerous._id],
});

const page_covid_19_symptoms_sentence_3_v1 = new Statement({
  _id: _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[2],
  pageID: _ids.pages.page_covid_19_symptoms._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Although rare, there are concerns about some recovered patients suffering from long effects of the disease - known as long COVID - whose symptoms include severe fatigue, memory loss, and other cognitive issues, low-grade fever, muscle weakness, and breathlessness.",
          styles: [],
        },
      ],
    },
  ],
  questions: [_ids.questions.what_is_long_covid._id],
});

const statements = [
  page_covid_19_symptoms_sentence_1_v1,
  page_covid_19_symptoms_sentence_2_v1,
  page_covid_19_symptoms_sentence_3_v1,
];

export default statements;

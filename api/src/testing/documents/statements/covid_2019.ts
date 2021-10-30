import _ids from "../../_ids";

import { Statement } from "@models";

const page_covid_2019_statement_1_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[0],
  page: _ids.pages.page_covid_2019._id,
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
                page: _ids.pages.page_sars_cov_2._id,
              },
            },
          ],
        },
        {
          string: ".",
          styles: [],
        },
      ],
      questions: [_ids.questions.what_is_covid_19._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_2019_statement_2_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[1],
  page: _ids.pages.page_covid_2019._id,
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
      questions: [_ids.questions.where_was_the_first_case_of_covid_19._id],
    },
    {
      createdAt: new Date("2021-10-26"),
      stringArray: [
        {
          string:
            "The first case of this was reported by officians in Wuhan, China in December 2019, although it is ",
          styles: [],
        },
        {
          string: "now suspected",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://www.livescience.com/first-case-coronavirus-found.html",
              },
            },
          ],
        },
        {
          string: " that the first case dates back to November 17th, 2019.",
          styles: [],
        },
      ],
      sourceEditProposal:
        _ids.paragraphEditProposals.page_covid_19_paragraph_v1_proposal_1._id,
      questions: [_ids.questions.where_was_the_first_case_of_covid_19._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_2019_statement_3_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[2],
  page: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      quotedStatement:
        _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[0],
      stringArray: [],
      questions: [_ids.questions.what_are_the_common_symptoms_of_covid_19._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_2019_statement_4_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[3],
  page: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      quotedStatement:
        _ids.pages.page_covid_19_transmission.paragraphs[0].statements[0],
      stringArray: [],
      questions: [_ids.questions.how_is_sars_cov_2_transmitted._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_2019_statement_5_v1 = new Statement({
  _id: _ids.pages.page_covid_2019.paragraphs[0].statements[4],
  page: _ids.pages.page_covid_2019._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "The mainstream consensus states that: ",
          style: [],
        },
        {
          string: "",
          styles: [
            {
              type: "quote",
              value: {
                statement:
                  _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
              },
            },
          ],
        },
      ],
      questions: [],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const statements = [
  page_covid_2019_statement_1_v1,
  page_covid_2019_statement_2_v1,
  page_covid_2019_statement_3_v1,
  page_covid_2019_statement_4_v1,
  page_covid_2019_statement_5_v1,
];

export default statements;

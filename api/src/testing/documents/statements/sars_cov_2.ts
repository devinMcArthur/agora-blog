import _ids from "../../_ids";

import { Statement } from "@models";

// page_sars_cov_2
const page_sars_cov_2_statement_1_v1 = new Statement({
  _id: _ids.pages.page_sars_cov_2.paragraphs[0].statements[0],
  page: _ids.pages.page_sars_cov_2._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) is the strain of coronavirus that causes ",
          styles: [],
        },
        {
          string: "coronavirus disease 2019",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_covid_2019._id,
              },
            },
          ],
        },
        {
          string: ", the respiratory illness responsible for the ",
          styles: [],
        },
        {
          string: "COVID-19 pandemic",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_covid_19_pandemic._id,
              },
            },
          ],
        },
      ],
      questions: [_ids.questions.what_is_sars_cov_2._id],
    },
  ],
});

const page_sars_cov_2_statement_2_v1 = new Statement({
  _id: _ids.pages.page_sars_cov_2.paragraphs[0].statements[1],
  page: _ids.pages.page_sars_cov_2._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "SARS-CoV-2 is a Baltimore class IV ",
          styles: [],
        },
        {
          string: "positive-sense single-stranded RNA virus",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://en.wikipedia.org/wiki/Positive-strand_RNA_virus",
              },
            },
          ],
        },
        {
          string: " that is contagious in humans.",
          styles: [],
        },
      ],
      questions: [_ids.questions.what_is_sars_cov_2._id],
    },
  ],
});

const page_sars_cov_2_statement_3_v1 = new Statement({
  _id: _ids.pages.page_sars_cov_2.paragraphs[0].statements[2],
  page: _ids.pages.page_sars_cov_2._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "This virus is a successor to ",
          styles: [],
        },
        {
          string: "SARS-CoV-1",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://en.wikipedia.org/wiki/Severe_acute_respiratory_syndrome_coronavirus",
              },
            },
          ],
        },
        {
          string: ", the strain that caused the 2002-2004 SARS outbreak.",
          styles: [],
        },
      ],
      questions: [_ids.questions.how_is_sars_cov_2_related_to_sars_cov_1._id],
    },
  ],
});

const page_sars_cov_2_statement_4_v1 = new Statement({
  _id: _ids.pages.page_sars_cov_2.paragraphs[0].statements[3],
  page: _ids.pages.page_sars_cov_2._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "Policies to slow the spread of this virus includes ",
          styles: [],
        },
        {
          string: "mask mandates",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_covid_19_masks._id,
              },
            },
          ],
        },
        {
          string: ", social distancing and quarantines.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions.how_is_the_spread_of_covid_19_being_slowed._id,
      ],
    },
  ],
});

const statements = [
  page_sars_cov_2_statement_1_v1,
  page_sars_cov_2_statement_2_v1,
  page_sars_cov_2_statement_3_v1,
  page_sars_cov_2_statement_4_v1,
];

export default statements;

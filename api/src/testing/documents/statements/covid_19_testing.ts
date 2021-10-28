import _ids from "../../_ids";

import { Statement } from "@models";

const page_covid_19_testing_statement_1_v1 = new Statement({
  _id: _ids.pages.page_covid_19_testing.paragraphs[0].statements[0],
  page: _ids.pages.page_covid_19_testing._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string: "COVID-19",
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
          string:
            " testing involves analyzing samples to assess the current or past presence of ",
          styles: [],
        },
        {
          string: "SARS-CoV-2",
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
      questions: [_ids.questions.what_does_a_covid_19_test_do._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_testing_statement_2_v1 = new Statement({
  _id: _ids.pages.page_covid_19_testing.paragraphs[0].statements[1],
  page: _ids.pages.page_covid_19_testing._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string:
            "There are two categories of tests used: a test for viral presence used to diagnose current cases, and the antibody tests used to show if someone ",
          styles: [],
        },
        {
          string: "had",
          styles: [
            {
              type: "bold",
            },
          ],
        },
        {
          string: " ",
          styles: [],
        },
        {
          string: "COVID-19",
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
          string: ". To test current cases, the methods include ",
          styles: [],
        },
        {
          string: "Reverse transcription polymerase chain reaction (PCR)",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_covid_19_rt_pcr_test._id,
              },
            },
          ],
        },
        {
          string:
            ", isothermal amplification assays, antigen tests, and imaging.",
          styles: [],
        },
      ],
      questions: [_ids.questions.what_tests_are_used_to_test_for_covid_19._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_testing_statement_3_v1 = new Statement({
  _id: _ids.pages.page_covid_19_testing.paragraphs[0].statements[2],
  page: _ids.pages.page_covid_19_testing._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string: "The effectiveness of ",
          styles: [],
        },
        {
          string: "COVID-19",
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
          string:
            " tests depends on the method used to test. For RT-PCR tests which is most commonly used: ",
          styles: [],
        },
        {
          styles: [
            {
              type: "quote",
              value: {
                statement:
                  _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0]
                    .statements[1],
              },
            },
          ],
        },
      ],
      questions: [
        _ids.questions.what_is_the_effectiveness_of_covid_19_testing._id,
      ],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_testing_statement_4_v1 = new Statement({
  _id: _ids.pages.page_covid_19_testing.paragraphs[0].statements[3],
  page: _ids.pages.page_covid_19_testing._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string: "The benefit of testing for ",
          styles: [],
        },
        {
          string: "COVID-19",
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
          string:
            " is to give health officials an estimation as to the number of cases of the virus, estimate infection fatality rates, recommend / mandate quarantine for those who test positive, and allows for contact tracing to slow the spread of ",
          styles: [],
        },
        {
          string: "SARS-CoV-2",
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
      questions: [
        _ids.questions.what_are_the_benefits_of_testing_for_covid_19._id,
      ],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_testing_statement_5_v1 = new Statement({
  _id: _ids.pages.page_covid_19_testing.paragraphs[0].statements[4],
  page: _ids.pages.page_covid_19_testing._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string: "With the false positive rate of ",
          styles: [],
        },
        {
          string: "RT-PCR",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_covid_19_rt_pcr_test._id,
              },
            },
          ],
        },
        {
          string: " of ",
          styles: [],
        },
        {
          styles: [
            {
              type: "variable",
              value: {
                variable:
                  _ids.variables.var_covid_19_rt_pcr_test_false_positive_rate
                    ._id,
              },
            },
          ],
        },
        {
          string:
            "% and with most regions not releasing information regarding the ",
          styles: [],
        },
        {
          string: "Ct values",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_rt_pcr_cycle_threshold._id,
              },
            },
          ],
        },
        {
          string:
            " of a given test, there are worries that the total number of ",
          styles: [],
        },
        {
          string: "COVID-19",
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
          string: " cases can be ",
          styles: [],
        },
        {
          string: "artifically",
          styles: [
            {
              type: "bold",
            },
          ],
        },
        {
          string:
            " inflated by simply increasing testing and increasing the Cycle Threshold value, giving governments a justification for harsher restrictions on their citizens.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions.what_are_the_downsides_of_testing_for_covid_19._id,
      ],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const statements = [
  page_covid_19_testing_statement_1_v1,
  page_covid_19_testing_statement_2_v1,
  page_covid_19_testing_statement_3_v1,
  page_covid_19_testing_statement_4_v1,
  page_covid_19_testing_statement_5_v1,
];

export default statements;

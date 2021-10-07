import _ids from "../../_ids";

import { Statement } from "@models";

const page_covid_19_rt_pcr_test_statement_1_v1 = new Statement({
  _id: _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[0],
  page: _ids.pages.page_covid_19_rt_pcr_test._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string:
            "Polymerase chain reaction (PCR) is a process that amplifies (replicates) a small, well-defined segment of DNA many hundreds of times, creating enough of it for analysis, while reverse transcription (RT) converts RNA to DNA. It is the most common form of ",
          styles: [],
        },
        {
          string: " testing for COVID-19",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                page: _ids.pages.page_covid_19_testing._id,
              },
            },
          ],
        },
        {
          string: ".",
          styles: [],
        },
      ],
      questions: [_ids.questions.what_is_a_covid_19_rt_pcr_test._id],
    },
  ],
});

const page_covid_19_rt_pcr_test_statement_2_v1 = new Statement({
  _id: _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[1],
  page: _ids.pages.page_covid_19_rt_pcr_test._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string:
            "The average negative rate (doesn't have the virus and tests negative) was ",
          styles: [],
        },
        {
          styles: [
            {
              type: "variable",
              value: {
                variable:
                  _ids.variables.var_covid_19_rt_pcr_test_sensitivity._id,
              },
            },
          ],
        },
        {
          string:
            "% (ranging from 68% to 100%) with an average positive rate (has the virus and tests positive) was ",
          styles: [],
        },
        {
          styles: [
            {
              type: "variable",
              value: {
                variable:
                  _ids.variables.var_covid_19_rt_pcr_test_specificity._id,
              },
            },
          ],
        },
        {
          string: "% (false-positive rate of ",
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
            "%), with test results depending on the different company brands and sampling methods.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions.what_is_the_effectiveness_of_rt_pcr_covid_19_tests._id,
        _ids.questions.what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests
          ._id,
        _ids.questions.what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests
          ._id,
      ],
      sources: {
        urls: [
          "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013705/full",
        ],
      },
    },
  ],
});

const page_covid_19_rt_pcr_test_statement_3_v1 = new Statement({
  _id: _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[2],
  page: _ids.pages.page_covid_19_rt_pcr_test._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string: "The false-positive rate can increase depending on the ",
          styles: [],
        },
        {
          string: "cycle threshold (Ct) value",
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
            " used for the test, as the Ct increases, the likelihood that a positive test is showing a nonviable or dead virus increases.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions.what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests
          ._id,
        _ids.questions.how_does_cycle_threshold_ct_affect_rt_pcr_test_accuracy
          ._id,
      ],
      sources: {
        urls: ["https://academic.oup.com/cid/article/71/16/2252/5841456"],
      },
    },
  ],
});

const statements = [
  page_covid_19_rt_pcr_test_statement_1_v1,
  page_covid_19_rt_pcr_test_statement_2_v1,
  page_covid_19_rt_pcr_test_statement_3_v1,
];

export default statements;

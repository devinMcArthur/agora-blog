import _ids from "../../_ids";

import Statement from "../../../models/Statement";

const page_rt_pcr_cycle_threshold_statement_1_v1 = new Statement({
  _id: _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0].statements[0],
  page: _ids.pages.page_rt_pcr_cycle_threshold._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string: "The cycle threshold (Ct) of a ",
          styles: [],
        },
        {
          string: "RT-PCR test",
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
            " is the number of times the sample is amplified, if the fluorescence reaches a specified threshold within a certain number of PCR cycles (Ct value), the sample is considered positive.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions
          .what_is_the_significance_of_cycle_threshold_for_rt_pcr_tests._id,
      ],
      sources: {
        urls: ["https://academic.oup.com/cid/article/71/16/2252/5841456"],
      },
    },
  ],
});

const page_rt_pcr_cycle_threshold_statement_2_v1 = new Statement({
  _id: _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0].statements[1],
  page: _ids.pages.page_rt_pcr_cycle_threshold._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string:
            "The Ct value is a measure of viral load present in a given test, the value is inversely related to the viral load, every ~3.3 increase in the Ct value reflects a 10-fold reduction in starting viral material.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions.what_is_the_significance_of_cycle_threshold_value._id,
      ],
      sources: {
        urls: ["https://academic.oup.com/cid/article/71/16/2252/5841456"],
      },
    },
  ],
});

const page_rt_pcr_cycle_threshold_statement_3_v1 = new Statement({
  _id: _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0].statements[2],
  page: _ids.pages.page_rt_pcr_cycle_threshold._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string:
            "A study has shown that with a Ct value of 25, 70% of patients remain positive in cell cultures, at 30, this value drops to 20%, and at Ct = 35, <3% of cultures are positive for viral ",
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
          string:
            " RNA. Confirming that high Ct values are mostly correlated with low viral loads.",
          styles: [],
        },
      ],
      questions: [_ids.questions.how_does_ct_value_effect_testing_outcomes._id],
      sources: {
        urls: [
          "https://academic.oup.com/cid/advance-article/doi/10.1093/cid/ciaa1491/5912603",
        ],
      },
    },
  ],
});

const page_rt_pcr_cycle_threshold_statement_4_v1 = new Statement({
  _id: _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0].statements[3],
  page: _ids.pages.page_rt_pcr_cycle_threshold._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-07"),
      stringArray: [
        {
          string:
            "Cycle threshold is typically used by health officials to determine how much viral load should be considered a positive result, with ",
          styles: [],
        },
        {
          string: "some scientists recommending",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://academic.oup.com/cid/article/71/16/2252/5841456",
              },
            },
          ],
        },
        {
          string:
            " that the Ct value should be provided as a supplment to the test result to refine clinical decision making, a step that was already taken by Florida health officals.",
          styles: [],
        },
      ],
      questions: [
        _ids.questions.how_is_cycle_threshold_used._id,
        _ids.questions
          .why_did_florida_mandate_reporting_of_cycle_threshold_value_for_rt_pcr_tests
          ._id,
      ],
      sources: {
        urls: [
          "https://www.flhealthsource.gov/files/Laboratory-Reporting-CT-Values-12032020.pdf",
        ],
      },
    },
  ],
});

const statements = [
  page_rt_pcr_cycle_threshold_statement_1_v1,
  page_rt_pcr_cycle_threshold_statement_2_v1,
  page_rt_pcr_cycle_threshold_statement_3_v1,
  page_rt_pcr_cycle_threshold_statement_4_v1,
];

export default statements;

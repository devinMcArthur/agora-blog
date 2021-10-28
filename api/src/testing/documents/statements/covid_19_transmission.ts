import _ids from "../../_ids";

import { Statement } from "@models";

const page_covid_19_transmission_statement_1_v1 = new Statement({
  _id: _ids.pages.page_covid_19_transmission.paragraphs[0].statements[0],
  page: _ids.pages.page_covid_19_transmission._id,
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
                page: _ids.pages.page_sars_cov_2._id,
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
      questions: [_ids.questions.how_is_sars_cov_2_transmitted._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_transmission_statement_2_v1 = new Statement({
  _id: _ids.pages.page_covid_19_transmission.paragraphs[0].statements[1],
  page: _ids.pages.page_covid_19_transmission._id,
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
      questions: [
        _ids.questions.does_sars_cov_2_spread_from_asymptomatic_cases._id,
      ],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_transmission_statement_3_v1 = new Statement({
  _id: _ids.pages.page_covid_19_transmission.paragraphs[0].statements[2],
  page: _ids.pages.page_covid_19_transmission._id,
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
      questions: [
        _ids.questions
          .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread._id,
      ],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const statements = [
  page_covid_19_transmission_statement_1_v1,
  page_covid_19_transmission_statement_2_v1,
  page_covid_19_transmission_statement_3_v1,
];

export default statements;

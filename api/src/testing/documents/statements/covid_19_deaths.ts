import _ids from "../../_ids";

import { Statement } from "@models";

const page_covid_19_deaths_statement_1_v1 = new Statement({
  _id: _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
  page: _ids.pages.page_covid_19_deaths._id,
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
                page: _ids.pages.page_covid_2019._id,
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
      questions: [_ids.questions.what_counts_as_a_covid_19_death._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_deaths_statement_2_v1 = new Statement({
  _id: _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
  page: _ids.pages.page_covid_19_deaths._id,
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
                variable: _ids.variables.var_global_deaths_covid_19._id,
              },
            },
          ],
        },
        {
          string: " deaths have been attributed to COVID-19.",
          styles: [],
        },
      ],
      questions: [_ids.questions.how_many_covid_19_deaths_have_there_been._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const page_covid_19_deaths_statement_3_v1 = new Statement({
  _id: _ids.pages.page_covid_19_deaths.paragraphs[0].statements[2],
  page: _ids.pages.page_covid_19_deaths._id,
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
      questions: [_ids.questions.who_is_most_likely_to_die_from_covid_19._id],
    },
  ],
  originalAuthor: _ids.users.dev._id,
});

const statements = [
  page_covid_19_deaths_statement_1_v1,
  page_covid_19_deaths_statement_2_v1,
  page_covid_19_deaths_statement_3_v1,
];

export default statements;

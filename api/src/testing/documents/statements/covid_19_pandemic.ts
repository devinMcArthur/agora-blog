import _ids from "../../_ids";

import { Statement } from "@models";

const page_covid_19_pandemic_statement_1_v1 = new Statement({
  _id: _ids.pages.page_covid_19_pandemic.paragraphs[0].statements[0],
  page: _ids.pages.page_covid_19_pandemic._id,
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
                page: _ids.pages.page_covid_2019._id,
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
      questions: [_ids.questions.what_is_the_covid_19_pandemic._id],
    },
  ],
});

const statements = [page_covid_19_pandemic_statement_1_v1];

export default statements;

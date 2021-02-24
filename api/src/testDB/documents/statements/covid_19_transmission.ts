import _ids from "../../_ids";

import Statement from "../../../models/Statement";

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
            "There have been competing outcomes of research done on asymptomatic spread, with some ",
          styles: [],
        },
        {
          string: "early studies",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://onlinelibrary.wiley.com/doi/full/10.1111/irv.12743"
              }
            }
          ]
        }, 
        {
          string: " finding that asyptomatic spread is possible, but a ",
          styles: []
        }, 
        {
          string: "recent study in China",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://pubmed.ncbi.nlm.nih.gov/33219229/"
              }
            }
          ]
        },
        {
          string: ", with nearly 10,000,000 participants found no spread among 1,174 close contacts of asymptomatic cases, pointing to the possibility that spread from these cases are likely to be exceedingly rare."
        }
      ],
      sources: {
        urls: ["https://onlinelibrary.wiley.com/doi/full/10.1111/irv.12743", "https://pubmed.ncbi.nlm.nih.gov/33219229/"],
      },
      questions: [
        _ids.questions.does_sars_cov_2_spread_from_asymptomatic_cases._id,
        _ids.questions
          .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread._id
      ],
    },
  ],
});

const statements = [
  page_covid_19_transmission_statement_1_v1,
  page_covid_19_transmission_statement_2_v1,
];

export default statements;

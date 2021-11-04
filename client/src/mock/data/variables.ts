import _ids from "./_ids";

import Variable from "../../typescript/interfaces/documents/Variable";

const var_global_cases_covid_19: Variable = {
  _id: _ids.variables.var_global_cases_covid_19._id,
  title: "Global cases of COVID-19",
  versions: [
    {
      type: "number",
      number: 63000000,
      createdAt: new Date("2020-12-01"),
      sourceUrl: "https://coronavirus.jhu.edu/map.html",
    },
    {
      type: "number",
      number: 67316936,
      createdAt: new Date("2020-12-07"),
      sourceUrl: "https://coronavirus.jhu.edu/map.html",
    },
  ],
};

const var_global_deaths_covid_19: Variable = {
  _id: _ids.variables.var_global_deaths_covid_19._id,
  title: "Global deaths from COVID-19",
  versions: [
    {
      type: "number",
      number: 1539965,
      createdAt: new Date("2020-12-07"),
      sourceUrl: "https://coronavirus.jhu.edu/map.html",
    },
  ],
};

const var_covid_19_rt_pcr_test_sensitivity: Variable = {
  _id: _ids.variables.var_covid_19_rt_pcr_test_sensitivity._id,
  title: "COVID-19 RT-PCR test sensitivity",
  versions: [
    {
      type: "number",
      number: 95.9,
      createdAt: new Date("2020-12-07"),
      sourceUrl:
        "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013705/full",
    },
  ],
};

const var_covid_19_rt_pcr_test_false_negative_rate: Variable = {
  _id: _ids.variables.var_covid_19_rt_pcr_test_false_negative_rate._id,
  title: "COVID-19 RT-PCR test false-negative rate",
  versions: [
    {
      type: "equation",
      equation: [
        {
          type: "number",
          number: 100,
        },
        {
          type: "operator",
          operator: "-",
        },
        {
          type: "variable",
          variableID: _ids.variables.var_covid_19_rt_pcr_test_sensitivity._id,
        },
      ],
      createdAt: new Date("2020-12-07"),
    },
  ],
};

const var_covid_19_rt_pcr_test_specificity: Variable = {
  _id: _ids.variables.var_covid_19_rt_pcr_test_specificity._id,
  title: "COVID-19 RT-PCR test specificity",
  versions: [
    {
      type: "number",
      number: 98.9,
      createdAt: new Date("2020-12-07"),
      sourceUrl:
        "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD013705/full",
    },
  ],
};

const var_covid_19_rt_pcr_test_false_positive_rate: Variable = {
  _id: _ids.variables.var_covid_19_rt_pcr_test_false_positive_rate._id,
  title: "COVID-19 RT-PCR test false-positive rate",
  versions: [
    {
      type: "equation",
      equation: [
        {
          type: "number",
          number: 100,
        },
        {
          type: "operator",
          operator: "-",
        },
        {
          type: "variable",
          variableID: _ids.variables.var_covid_19_rt_pcr_test_specificity._id,
        },
      ],
      createdAt: new Date("2020-12-07"),
    },
  ],
};

const variables = [
  var_global_cases_covid_19,
  var_global_deaths_covid_19,
  var_covid_19_rt_pcr_test_sensitivity,
  var_covid_19_rt_pcr_test_false_negative_rate,
  var_covid_19_rt_pcr_test_specificity,
  var_covid_19_rt_pcr_test_false_positive_rate,
];

export default variables;

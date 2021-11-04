import _ids from "../_ids";

import { Variable, VariableDocument } from "@models";

export interface SeededVariables {
  var_global_cases_covid_19: VariableDocument;
  var_global_deaths_covid_19: VariableDocument;
  var_covid_19_rt_pcr_test_sensitivity: VariableDocument;
  var_covid_19_rt_pcr_test_false_negative_rate: VariableDocument;
  var_covid_19_rt_pcr_test_specificity: VariableDocument;
  var_covid_19_rt_pcr_test_false_positive_rate: VariableDocument;
}

const createVariables = () => {
  return new Promise<SeededVariables>(async (resolve, reject) => {
    try {
      const var_global_cases_covid_19 = new Variable({
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
          {
            type: "number",
            number: 109678891,
            createdAt: new Date("2021-02-17"),
            sourceUrl: "https://coronavirus.jhu.edu/map.html",
          },
        ],
      });

      const var_global_deaths_covid_19 = new Variable({
        _id: _ids.variables.var_global_deaths_covid_19._id,
        title: "Global deaths from COVID-19",
        versions: [
          {
            type: "number",
            number: 1539965,
            createdAt: new Date("2020-12-07"),
            sourceUrl: "https://coronavirus.jhu.edu/map.html",
          },
          {
            type: "number",
            number: 2423443,
            createdAt: new Date("2020-02-17"),
            sourceUrl: "https://coronavirus.jhu.edu/map.html",
          },
        ],
      });

      const var_covid_19_rt_pcr_test_sensitivity = new Variable({
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
      });

      const var_covid_19_rt_pcr_test_false_negative_rate = new Variable({
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
                variable:
                  _ids.variables.var_covid_19_rt_pcr_test_sensitivity._id,
              },
            ],
            createdAt: new Date("2020-12-07"),
          },
        ],
      });

      const var_covid_19_rt_pcr_test_specificity = new Variable({
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
      });

      const var_covid_19_rt_pcr_test_false_positive_rate = new Variable({
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
                variable:
                  _ids.variables.var_covid_19_rt_pcr_test_specificity._id,
              },
            ],
            createdAt: new Date("2020-12-07"),
          },
        ],
      });

      const variables = {
        var_global_cases_covid_19,
        var_global_deaths_covid_19,
        var_covid_19_rt_pcr_test_sensitivity,
        var_covid_19_rt_pcr_test_false_negative_rate,
        var_covid_19_rt_pcr_test_specificity,
        var_covid_19_rt_pcr_test_false_positive_rate,
      };

      for (let i = 0; i < Object.values(variables).length; i++) {
        await Object.values(variables)[i].save();
      }

      resolve(variables);
    } catch (e) {
      reject(e);
    }
  });
};

export default createVariables;

import _ids from "../_ids";

import { VariableEditProposalDocument, VariableEditProposal } from "@models";

export interface ISeededVariableEditProposals {
  var_global_cases_covid_19_v2: VariableEditProposalDocument;
  var_global_cases_covid_19_v3: VariableEditProposalDocument;
  var_global_cases_covid_19_v4: VariableEditProposalDocument;
  var_global_deaths_covid_19_v2: VariableEditProposalDocument;
  var_global_deaths_covid_19_v3: VariableEditProposalDocument;
  var_covid_19_rt_pcr_test_sensitivity_v2: VariableEditProposalDocument;
}

const createVariableEditProposals = () => {
  return new Promise<ISeededVariableEditProposals>(async (resolve, reject) => {
    try {
      const var_global_cases_covid_19_v2 = new VariableEditProposal({
        variable: _ids.variables.var_global_cases_covid_19._id,
        variableVersionIndex: 0,
        value: {
          type: "number",
          number: 67316936,
          createdAt: new Date("2020-12-07"),
          sourceUrl: "https://coronavirus.jhu.edu/map.html",
        },
        author: _ids.users.dev._id,
      });

      const var_global_cases_covid_19_v3 = new VariableEditProposal({
        variable: _ids.variables.var_global_cases_covid_19._id,
        variableVersionIndex: 1,
        value: {
          type: "number",
          number: 109678891,
          createdAt: new Date("2021-02-17"),
          sourceUrl: "https://coronavirus.jhu.edu/map.html",
        },
        author: _ids.users.dev._id,
      });

      const var_global_cases_covid_19_v4 = new VariableEditProposal({
        variable: _ids.variables.var_global_cases_covid_19._id,
        variableVersionIndex: 2,
        value: {
          type: "number",
          number: 251795820,
          createdAt: new Date("2021-11-11"),
          sourceUrl: "https://coronavirus.jhu.edu/map.html",
        },
        author: _ids.users.dev._id,
      });

      const var_global_deaths_covid_19_v2 = new VariableEditProposal({
        variable: _ids.variables.var_global_deaths_covid_19._id,
        variableVersionIndex: 0,
        value: {
          type: "number",
          number: 2423443,
          createdAt: new Date("2021-02-17"),
          sourceUrl: "https://coronavirus.jhu.edu/map.html",
        },
        author: _ids.users.dev._id,
      });

      const var_global_deaths_covid_19_v3 = new VariableEditProposal({
        variable: _ids.variables.var_global_deaths_covid_19._id,
        variableVersionIndex: 1,
        value: {
          type: "number",
          number: 5077932,
          createdAt: new Date("2021-11-11"),
          sourceUrl: "https://coronavirus.jhu.edu/map.html",
        },
        author: _ids.users.dev._id,
      });

      const var_covid_19_rt_pcr_test_sensitivity_v2 = new VariableEditProposal({
        variable: _ids.variables.var_covid_19_rt_pcr_test_sensitivity._id,
        variableVersionIndex: 0,
        value: {
          type: "number",
          number: 85.7,
          sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/34019562/",
        },
        author: _ids.users.dev._id,
      });

      const variables: ISeededVariableEditProposals = {
        var_global_cases_covid_19_v2,
        var_global_cases_covid_19_v3,
        var_global_cases_covid_19_v4,
        var_global_deaths_covid_19_v2,
        var_global_deaths_covid_19_v3,
        var_covid_19_rt_pcr_test_sensitivity_v2,
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

export default createVariableEditProposals;

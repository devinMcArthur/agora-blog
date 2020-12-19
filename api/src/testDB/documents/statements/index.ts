import covid_19_deaths_statements from "./covid_19_deaths";
import covid_19_masks_statements from "./covid_19_masks";
import covid_19_pandemic_statements from "./covid_19_pandemic";
import covid_19_rt_pcr_test_statements from "./covid_19_rt_pcr_test";
import covid_19_symptoms_statements from "./covid_19_symptoms";
import covid_19_testing_statements from "./covid_19_testing";
import covid_19_transmission_statements from "./covid_19_transmission";
import covid_2019_statements from "./covid_2019";
import rt_pcr_cycle_threshold_statements from "./rt_pcr_cycle_threshold";
import sars_cov_2_statements from "./sars_cov_2";

const createStatements = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const statements = [
        ...covid_19_deaths_statements,
        ...covid_19_masks_statements,
        ...covid_19_pandemic_statements,
        ...covid_19_rt_pcr_test_statements,
        ...covid_19_symptoms_statements,
        ...covid_19_testing_statements,
        ...covid_19_transmission_statements,
        ...covid_2019_statements,
        ...rt_pcr_cycle_threshold_statements,
        ...sars_cov_2_statements,
      ];

      for (let i = 0; i < statements.length; i++) {
        await statements[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default createStatements;

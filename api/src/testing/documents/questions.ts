import _ids from "../_ids";

import { Question, QuestionDocument } from "@models";

export interface SeededQuestions {
  what_is_sars_cov_2: QuestionDocument;
  how_is_sars_cov_2_related_to_sars_cov_1: QuestionDocument;
  how_is_the_spread_of_covid_19_being_slowed: QuestionDocument;
  what_is_covid_19: QuestionDocument;
  where_was_the_first_case_of_covid_19: QuestionDocument;
  how_is_covid_19_transmitted: QuestionDocument;
  how_is_sars_cov_2_transmitted: QuestionDocument;
  does_sars_cov_2_spread_from_asymptomatic_cases: QuestionDocument;
  are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread: QuestionDocument;
  what_is_the_covid_19_pandemic: QuestionDocument;
  are_masks_effective_against_covid_19: QuestionDocument;
  should_masks_be_used_to_prevent_covid_19: QuestionDocument;
  which_masks_are_effective_against_covid_19: QuestionDocument;
  why_do_people_want_mask_mandates: QuestionDocument;
  why_are_people_against_wearing_masks: QuestionDocument;
  what_are_the_common_symptoms_of_covid_19: QuestionDocument;
  why_is_covid_19_dangerous: QuestionDocument;
  what_is_long_covid: QuestionDocument;
  what_counts_as_a_covid_19_death: QuestionDocument;
  how_many_covid_19_deaths_have_there_been: QuestionDocument;
  who_is_most_likely_to_die_from_covid_19: QuestionDocument;
  what_does_a_covid_19_test_do: QuestionDocument;
  what_tests_are_used_to_test_for_covid_19: QuestionDocument;
  what_is_the_effectiveness_of_covid_19_testing: QuestionDocument;
  what_are_the_benefits_of_testing_for_covid_19: QuestionDocument;
  what_are_the_downsides_of_testing_for_covid_19: QuestionDocument;
  what_is_a_covid_19_rt_pcr_test: QuestionDocument;
  what_is_the_effectiveness_of_rt_pcr_covid_19_tests: QuestionDocument;
  what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests: QuestionDocument;
  what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests: QuestionDocument;
  how_does_cycle_threshold_ct_affect_rt_pcr_test_accuracy: QuestionDocument;
  what_is_the_significance_of_cycle_threshold_for_rt_pcr_tests: QuestionDocument;
  what_is_the_significance_of_cycle_threshold_value: QuestionDocument;
  how_is_cycle_threshold_used: QuestionDocument;
  why_did_florida_mandate_reporting_of_cycle_threshold_value_for_rt_pcr_tests: QuestionDocument;
  how_does_ct_value_effect_testing_outcomes: QuestionDocument;
}

const createQuestions = () => {
  return new Promise<SeededQuestions>(async (resolve, reject) => {
    try {
      const what_is_sars_cov_2 = new Question({
        _id: _ids.questions.what_is_sars_cov_2._id,
        question: "What is SARS-CoV-2?",
      });

      const how_is_sars_cov_2_related_to_sars_cov_1 = new Question({
        _id: _ids.questions.how_is_sars_cov_2_related_to_sars_cov_1._id,
        question: "How is SARS-CoV-2 related to SARS-CoV-1?",
      });

      const how_is_the_spread_of_covid_19_being_slowed = new Question({
        _id: _ids.questions.how_is_the_spread_of_covid_19_being_slowed._id,
        question: "How is the spread of COVID-19 being slowed?",
      });

      const what_is_covid_19 = new Question({
        _id: _ids.questions.what_is_covid_19._id,
        question: "What is COVID-19?",
      });

      const where_was_the_first_case_of_covid_19 = new Question({
        _id: _ids.questions.where_was_the_first_case_of_covid_19._id,
        question: "Where was the first case of COVID-19?",
      });

      const how_is_covid_19_transmitted = new Question({
        _id: _ids.questions.how_is_covid_19_transmitted._id,
        question: "How is COVID-19 transmitted?",
      });

      const how_is_sars_cov_2_transmitted = new Question({
        _id: _ids.questions.how_is_sars_cov_2_transmitted._id,
        question: "How is SARS-CoV-2 transmitted?",
      });

      const does_sars_cov_2_spread_from_asymptomatic_cases = new Question({
        _id: _ids.questions.does_sars_cov_2_spread_from_asymptomatic_cases._id,
        question: "Does SARS-CoV-2 spread from asymptomatic cases?",
      });

      const are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread =
        new Question({
          _id: _ids.questions
            .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread
            ._id,
          question:
            "Are asymptomatic cases of COVID-19 a large contributer to spread?",
        });

      const what_is_the_covid_19_pandemic = new Question({
        _id: _ids.questions.what_is_the_covid_19_pandemic._id,
        question: "What is the COVID-19 pandemic?",
      });

      const are_masks_effective_against_covid_19 = new Question({
        _id: _ids.questions.are_masks_effective_against_covid_19._id,
        question: "Are masks effective against COVID-19?",
      });

      const should_masks_be_used_to_prevent_covid_19 = new Question({
        _id: _ids.questions.should_masks_be_used_to_prevent_covid_19._id,
        question: "Should masks be used to prevent COVID-19?",
      });

      const which_masks_are_effective_against_covid_19 = new Question({
        _id: _ids.questions.which_masks_are_effective_against_covid_19._id,
        question: "Which masks are effective against COVID-19?",
      });

      const why_do_people_want_mask_mandates = new Question({
        _id: _ids.questions.why_do_people_want_mask_mandates._id,
        question: "Which masks are effective against COVID-19?",
      });

      const why_are_people_against_wearing_masks = new Question({
        _id: _ids.questions.why_are_people_against_wearing_masks._id,
        question: "Why are people against wearing masks?",
      });

      const what_are_the_common_symptoms_of_covid_19 = new Question({
        _id: _ids.questions.what_are_the_common_symptoms_of_covid_19._id,
        question: "What are the common symptoms of COVID-19?",
      });

      const why_is_covid_19_dangerous = new Question({
        _id: _ids.questions.why_is_covid_19_dangerous._id,
        question: "Why is COVID-19 dangerous?",
      });

      const what_is_long_covid = new Question({
        _id: _ids.questions.what_is_long_covid._id,
        question: "What is long COVID?",
      });

      const what_counts_as_a_covid_19_death = new Question({
        _id: _ids.questions.what_counts_as_a_covid_19_death._id,
        question: "What counts as a COVID-19 death?",
      });

      const how_many_covid_19_deaths_have_there_been = new Question({
        _id: _ids.questions.how_many_covid_19_deaths_have_there_been._id,
        question: "How many COVID-19 deaths have there been?",
      });

      const who_is_most_likely_to_die_from_covid_19 = new Question({
        _id: _ids.questions.who_is_most_likely_to_die_from_covid_19._id,
        question: "Who is most likely to die from COVID-19?",
      });

      const what_does_a_covid_19_test_do = new Question({
        _id: _ids.questions.what_does_a_covid_19_test_do._id,
        question: "What does a COVID-19 test do?",
      });

      const what_tests_are_used_to_test_for_covid_19 = new Question({
        _id: _ids.questions.what_tests_are_used_to_test_for_covid_19._id,
        question: "What tests are used to test for COVID-19?",
      });

      const what_is_the_effectiveness_of_covid_19_testing = new Question({
        _id: _ids.questions.what_is_the_effectiveness_of_covid_19_testing._id,
        question: "What is the effectiveness of COVID-19 testing?",
      });

      const what_are_the_benefits_of_testing_for_covid_19 = new Question({
        _id: _ids.questions.what_are_the_benefits_of_testing_for_covid_19._id,
        question: "What are the benefits of testing for COVID-19?",
      });

      const what_are_the_downsides_of_testing_for_covid_19 = new Question({
        _id: _ids.questions.what_are_the_downsides_of_testing_for_covid_19._id,
        question: "What are the downsides of testing for COVID-19?",
      });

      const what_is_a_covid_19_rt_pcr_test = new Question({
        _id: _ids.questions.what_is_a_covid_19_rt_pcr_test._id,
        question: "What is a COVID-19 RT-PCR test?",
      });

      const what_is_the_effectiveness_of_rt_pcr_covid_19_tests = new Question({
        _id: _ids.questions.what_is_the_effectiveness_of_rt_pcr_covid_19_tests
          ._id,
        question: "What is the effectiveness of RT-PCR COVID-19 tests?",
      });

      const what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests =
        new Question({
          _id: _ids.questions
            .what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests._id,
          question: "What is the false positive rate of RT-PCR COVID-19 tests?",
        });

      const what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests =
        new Question({
          _id: _ids.questions
            .what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests._id,
          question: "What is the false negative rate of RT-PCR COVID-19 tests?",
        });

      const how_does_cycle_threshold_ct_affect_rt_pcr_test_accuracy =
        new Question({
          _id: _ids.questions
            .how_does_cycle_threshold_ct_affect_rt_pcr_test_accuracy._id,
          question:
            "How does Cycle Threshold (Ct) affect RT-PCR test accuracy?",
        });

      const what_is_the_significance_of_cycle_threshold_for_rt_pcr_tests =
        new Question({
          _id: _ids.questions
            .what_is_the_significance_of_cycle_threshold_for_rt_pcr_tests._id,
          question:
            "What is the significance of Cycle Threshold for RT-PCR tests?",
        });

      const what_is_the_significance_of_cycle_threshold_value = new Question({
        _id: _ids.questions.what_is_the_significance_of_cycle_threshold_value
          ._id,
        question: "What is the significance of Cycle Threshold value?",
      });

      const how_is_cycle_threshold_used = new Question({
        _id: _ids.questions.how_is_cycle_threshold_used._id,
        question: "How is Cycle Threshold used?",
      });

      const why_did_florida_mandate_reporting_of_cycle_threshold_value_for_rt_pcr_tests =
        new Question({
          _id: _ids.questions
            .why_did_florida_mandate_reporting_of_cycle_threshold_value_for_rt_pcr_tests
            ._id,
          question:
            "Why did Florida mandate reporting of Cycle Threshold value for RT-PCR tests?",
        });

      const how_does_ct_value_effect_testing_outcomes = new Question({
        _id: _ids.questions.how_does_ct_value_effect_testing_outcomes._id,
        question: "How does Ct value effect testing outcomes?",
      });

      const why_are_face_masks_used_for_covid_19 = new Question({
        _id: _ids.questions.why_are_face_masks_used_for_covid_19._id,
        question: "Why are face masks used for COVID-19?",
      });

      const questions = {
        what_is_sars_cov_2,
        how_is_sars_cov_2_related_to_sars_cov_1,
        how_is_the_spread_of_covid_19_being_slowed,
        what_is_covid_19,
        where_was_the_first_case_of_covid_19,
        how_is_covid_19_transmitted,
        how_is_sars_cov_2_transmitted,
        does_sars_cov_2_spread_from_asymptomatic_cases,
        are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread,
        what_is_the_covid_19_pandemic,
        are_masks_effective_against_covid_19,
        should_masks_be_used_to_prevent_covid_19,
        which_masks_are_effective_against_covid_19,
        why_do_people_want_mask_mandates,
        why_are_people_against_wearing_masks,
        what_are_the_common_symptoms_of_covid_19,
        why_is_covid_19_dangerous,
        what_is_long_covid,
        what_counts_as_a_covid_19_death,
        how_many_covid_19_deaths_have_there_been,
        who_is_most_likely_to_die_from_covid_19,
        what_does_a_covid_19_test_do,
        what_tests_are_used_to_test_for_covid_19,
        what_is_the_effectiveness_of_covid_19_testing,
        what_are_the_benefits_of_testing_for_covid_19,
        what_are_the_downsides_of_testing_for_covid_19,
        what_is_a_covid_19_rt_pcr_test,
        what_is_the_effectiveness_of_rt_pcr_covid_19_tests,
        what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests,
        what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests,
        how_does_cycle_threshold_ct_affect_rt_pcr_test_accuracy,
        what_is_the_significance_of_cycle_threshold_for_rt_pcr_tests,
        what_is_the_significance_of_cycle_threshold_value,
        how_is_cycle_threshold_used,
        why_did_florida_mandate_reporting_of_cycle_threshold_value_for_rt_pcr_tests,
        how_does_ct_value_effect_testing_outcomes,
        why_are_face_masks_used_for_covid_19,
      };

      // Save all questions
      for (let i = 0; i < Object.values(questions).length; i++) {
        await Object.values(questions)[i].save();
      }

      resolve(questions);
    } catch (e) {
      reject(e);
    }
  });
};

export default createQuestions;

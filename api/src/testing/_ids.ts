import { Types } from "mongoose";

// To generate an ObjectId
// Run in chrome console: mongoose.Types.ObjectId().toString();

const _ids = {
  pages: {
    page_sars_cov_2: {
      _id: Types.ObjectId("5fca845a8ddfa30000abd2c6"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca84618ddfa30000abd2c7"),
          statements: [
            Types.ObjectId("5fca8471d24f0800006b777a"),
            Types.ObjectId("5fca847bd24f0800006b777b"),
            Types.ObjectId("5fca8484d24f0800006b777c"),
            Types.ObjectId("5fca84a9d24f0800006b777d"),
          ],
        },
      ],
    },
    page_covid_2019: {
      _id: Types.ObjectId("5fca84afd24f0800006b777e"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca84b5d24f0800006b777f"),
          statements: [
            Types.ObjectId("5fca84bcd24f0800006b7780"),
            Types.ObjectId("5fca84ddd24f0800006b7781"),
            Types.ObjectId("5fca84e4d24f0800006b7782"),
            Types.ObjectId("5fca84ebd24f0800006b7783"),
            Types.ObjectId("5fcc15c016b3060000894df0"),
          ],
        },
        {
          _id: Types.ObjectId("5eca84b5d24f0800006b777f"),
          statements: [
            Types.ObjectId("5fca84bcd24f0800006b7780"),
            Types.ObjectId("5fca84ddd24f0800006b7781"),
            Types.ObjectId("5fca84e4d24f0800006b7782"),
            Types.ObjectId("5fca84ebd24f0800006b7783"),
            Types.ObjectId("5fcc15c016b3060000894df0"),
          ],
        },
      ],
    },
    page_covid_19_symptoms: {
      _id: Types.ObjectId("5fca84f1d24f0800006b7784"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca84f9d24f0800006b7785"),
          statements: [
            Types.ObjectId("5fca8500d24f0800006b7786"),
            Types.ObjectId("5fca8505d24f0800006b7787"),
            Types.ObjectId("5fca850cd24f0800006b7788"),
          ],
        },
      ],
    },
    page_covid_19_transmission: {
      _id: Types.ObjectId("5fca8516d24f0800006b77ad"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca851cd24f0800006b77ae"),
          statements: [
            Types.ObjectId("5fca8522d24f0800006b77af"),
            Types.ObjectId("5fca8528d24f0800006b77b0"),
            Types.ObjectId("5fca852dd24f0800006b77b1"),
          ],
        },
      ],
    },
    page_covid_19_pandemic: {
      _id: Types.ObjectId("5fca8536d24f0800006b77d2"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca853cd24f0800006b77d3"),
          statements: [Types.ObjectId("5fca8543d24f0800006b77d4")],
        },
      ],
    },
    page_covid_19_masks: {
      _id: Types.ObjectId("5fca854ad24f0800006b77d5"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca8550d24f0800006b77d6"),
          statements: [
            Types.ObjectId("5fca8556d24f0800006b77d7"),
            Types.ObjectId("5fca855cd24f0800006b77d8"),
            Types.ObjectId("5fca8561d24f0800006b77d9"),
            Types.ObjectId("5fca8567d24f0800006b77da"),
            Types.ObjectId("5fca856dd24f0800006b77db"),
            Types.ObjectId("5fca8573d24f0800006b77dc"),
          ],
        },
      ],
    },
    page_covid_19_deaths: {
      _id: Types.ObjectId("5fcbfaf432319c0000516e70"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fcbfb0332319c0000516e71"),
          statements: [
            Types.ObjectId("5fcbfb1032319c0000516e72"),
            Types.ObjectId("5fcbfcae32319c0000516e76"),
            Types.ObjectId("5fcbfcbe32319c0000516e77"),
          ],
        },
      ],
    },
    page_covid_19_testing: {
      _id: Types.ObjectId("5fce6989cf98ce0000e11730"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fce69b2cf98ce0000e11731"),
          statements: [
            Types.ObjectId("5fce69c7cf98ce0000e11732"),
            Types.ObjectId("5fce69d7cf98ce0000e11733"),
            Types.ObjectId("5fce69e6cf98ce0000e11734"),
            Types.ObjectId("5fce69f2cf98ce0000e11735"),
            Types.ObjectId("5fce6a03cf98ce0000e11736"),
          ],
        },
      ],
    },
    page_covid_19_rt_pcr_test: {
      _id: Types.ObjectId("5fce6b50cf98ce0000e1173c"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fce6b62cf98ce0000e1173d"),
          statements: [
            Types.ObjectId("5fce6b72cf98ce0000e1173e"),
            Types.ObjectId("5fce6bdbcf98ce0000e1173f"),
            Types.ObjectId("5fce6be7cf98ce0000e11740"),
          ],
        },
      ],
    },
    page_rt_pcr_cycle_threshold: {
      _id: Types.ObjectId("5fce6cf8cf98ce0000e11746"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fce6d07cf98ce0000e11747"),
          statements: [
            Types.ObjectId("5fce6d18cf98ce0000e11748"),
            Types.ObjectId("5fce6d23cf98ce0000e11749"),
            Types.ObjectId("5fce6d2dcf98ce0000e1174a"),
            Types.ObjectId("5fcfddf283d6a50000a16ae7"),
          ],
        },
      ],
    },
  },
  variables: {
    var_global_cases_covid_19: {
      _id: Types.ObjectId("5fca857bd24f0800006b77dd"),
    },
    var_global_deaths_covid_19: {
      _id: Types.ObjectId("5fce75edcf98ce0000e1174f"),
    },
    var_covid_19_rt_pcr_test_false_negative_rate: {
      _id: Types.ObjectId("5fce9893cf98ce0000e11750"),
    },
    var_covid_19_rt_pcr_test_false_positive_rate: {
      _id: Types.ObjectId("5fcea84dcf98ce0000e11753"),
    },
    var_covid_19_rt_pcr_test_specificity: {
      _id: Types.ObjectId("5fce98b4cf98ce0000e11751"),
    },
    var_covid_19_rt_pcr_test_sensitivity: {
      _id: Types.ObjectId("5fce990dcf98ce0000e11752"),
    },
  },
  questions: {
    what_is_sars_cov_2: {
      _id: Types.ObjectId("5fca8581d24f0800006b77de"),
    },
    how_is_sars_cov_2_related_to_sars_cov_1: {
      _id: Types.ObjectId("5fca8587d24f0800006b77df"),
    },
    how_is_the_spread_of_covid_19_being_slowed: {
      _id: Types.ObjectId("5fca858ed24f0800006b77e0"),
    },
    what_is_covid_19: {
      _id: Types.ObjectId("5fca8595d24f0800006b77e1"),
    },
    where_was_the_first_case_of_covid_19: {
      _id: Types.ObjectId("5fca859bd24f0800006b77e2"),
    },
    how_is_covid_19_transmitted: {
      _id: Types.ObjectId("5fca85a1d24f0800006b77e3"),
    },
    how_is_sars_cov_2_transmitted: {
      _id: Types.ObjectId("5fca85a7d24f0800006b77e4"),
    },
    does_sars_cov_2_spread_from_asymptomatic_cases: {
      _id: Types.ObjectId("5fca85acd24f0800006b77e5"),
    },
    are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread: {
      _id: Types.ObjectId("5fca85b3d24f0800006b77e6"),
    },
    what_are_the_common_symptoms_of_covid_19: {
      _id: Types.ObjectId("5fca85b9d24f0800006b77e7"),
    },
    why_is_covid_19_dangerous: {
      _id: Types.ObjectId("5fca85bfd24f0800006b77e8"),
    },
    what_is_long_covid: {
      _id: Types.ObjectId("5fca85c6d24f0800006b77e9"),
    },
    what_is_the_covid_19_pandemic: {
      _id: Types.ObjectId("5fca85cdd24f0800006b77ea"),
    },
    why_are_face_masks_used_for_covid_19: {
      _id: Types.ObjectId("5fca85d3d24f0800006b77eb"),
    },
    are_masks_effective_against_covid_19: {
      _id: Types.ObjectId("5fca85d9d24f0800006b77ec"),
    },
    should_masks_be_used_to_prevent_covid_19: {
      _id: Types.ObjectId("5fca85dfd24f0800006b77ed"),
    },
    which_masks_are_effective_against_covid_19: {
      _id: Types.ObjectId("5fca85e4d24f0800006b77ee"),
    },
    why_do_people_want_mask_mandates: {
      _id: Types.ObjectId("5fca85e9d24f0800006b77ef"),
    },
    why_are_people_against_wearing_masks: {
      _id: Types.ObjectId("5fca85efd24f0800006b77f0"),
    },
    how_many_covid_19_deaths_have_there_been: {
      _id: Types.ObjectId("5fcbfb3332319c0000516e73"),
    },
    what_counts_as_a_covid_19_death: {
      _id: Types.ObjectId("5fcbfc0832319c0000516e74"),
    },
    who_is_most_likely_to_die_from_covid_19: {
      _id: Types.ObjectId("5fcbfc2c32319c0000516e75"),
    },
    what_does_a_covid_19_test_do: {
      _id: Types.ObjectId("5fce6a2dcf98ce0000e11737"),
    },
    what_tests_are_used_to_test_for_covid_19: {
      _id: Types.ObjectId("5fce6a4acf98ce0000e11738"),
    },
    what_is_the_effectiveness_of_covid_19_testing: {
      _id: Types.ObjectId("5fce6a6acf98ce0000e11739"),
    },
    what_are_the_benefits_of_testing_for_covid_19: {
      _id: Types.ObjectId("5fce6a84cf98ce0000e1173a"),
    },
    what_are_the_downsides_of_testing_for_covid_19: {
      _id: Types.ObjectId("5fce6aa5cf98ce0000e1173b"),
    },
    what_is_a_covid_19_rt_pcr_test: {
      _id: Types.ObjectId("5fce6c17cf98ce0000e11741"),
    },
    what_is_the_effectiveness_of_rt_pcr_covid_19_tests: {
      _id: Types.ObjectId("5fce6c35cf98ce0000e11742"),
    },
    what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests: {
      _id: Types.ObjectId("5fce6c58cf98ce0000e11743"),
    },
    what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests: {
      _id: Types.ObjectId("5fce6c75cf98ce0000e11744"),
    },
    how_does_cycle_threshold_ct_affect_rt_pcr_test_accuracy: {
      _id: Types.ObjectId("5fce6caccf98ce0000e11745"),
    },
    what_is_the_significance_of_cycle_threshold_for_rt_pcr_tests: {
      _id: Types.ObjectId("5fce6d5dcf98ce0000e1174b"),
    },
    what_is_the_significance_of_cycle_threshold_value: {
      _id: Types.ObjectId("5fce6d7fcf98ce0000e1174c"),
    },
    how_is_cycle_threshold_used: {
      _id: Types.ObjectId("5fce6d95cf98ce0000e1174d"),
    },
    why_did_florida_mandate_reporting_of_cycle_threshold_value_for_rt_pcr_tests:
      {
        _id: Types.ObjectId("5fce6dbacf98ce0000e1174e"),
      },
    how_does_ct_value_effect_testing_outcomes: {
      _id: Types.ObjectId("5fcfdf0b83d6a50000a16ae8"),
    },
  },
  users: {
    dev: {
      _id: Types.ObjectId("5fca8581d24f0800000b78de"),
    },
    nonVerified: {
      _id: Types.ObjectId("5fca8581d24f0800000b78dd"),
    },
  },
  paragraphEditProposals: {
    page_covid_19_paragraph_v1_proposal_1: {
      _id: Types.ObjectId("5eca8581d24f0800000b78de"),
    },
    page_covid_19_paragraph_v2_proposal_1: {
      _id: Types.ObjectId("5eca8581d24f0800000b78dd"),
    },
  },
};

export default _ids;

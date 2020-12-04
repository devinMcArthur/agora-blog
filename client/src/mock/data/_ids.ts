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
          sentences: [
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
          sentences: [
            Types.ObjectId("5fca84bcd24f0800006b7780"),
            Types.ObjectId("5fca84ddd24f0800006b7781"),
            Types.ObjectId("5fca84e4d24f0800006b7782"),
            Types.ObjectId("5fca84ebd24f0800006b7783"),
          ],
        },
      ],
    },
    page_covid_19_symptoms: {
      _id: Types.ObjectId("5fca84f1d24f0800006b7784"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca84f9d24f0800006b7785"),
          sentences: [
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
          sentences: [
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
          sentences: [Types.ObjectId("5fca8543d24f0800006b77d4")],
        },
      ],
    },
    page_covid_19_masks: {
      _id: Types.ObjectId("5fca854ad24f0800006b77d5"),
      paragraphs: [
        {
          _id: Types.ObjectId("5fca8550d24f0800006b77d6"),
          sentences: [
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
  },
  variables: {
    var_global_cases_covid_19: {
      _id: Types.ObjectId("5fca857bd24f0800006b77dd"),
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
  },
};

export default _ids;

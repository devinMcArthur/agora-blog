import _ids from "../_ids";

import Sentence from "../../../typescript/interfaces/documents/Sentence";

const page_covid_19_masks_sentence_1_v1: Sentence = {
  _id: _ids.pages.page_covid_19_masks.paragraphs[0].sentences[0],
  pageID: _ids.pages.page_covid_19_masks._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string: "During the ",
          styles: [],
        },
        {
          string: "COVID-19",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                pageID: _ids.pages.page_covid_2019._id,
              },
            },
          ],
        },
        {
          string:
            " pandemic, face masks have been employed as a public and person health control measure against the spread of ",
          styles: [],
        },
        {
          string: "SARS-CoV-2",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                pageID: _ids.pages.page_sars_cov_2._id,
              },
            },
          ],
        },
        {
          string: ".",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    { questionID: _ids.questions.why_are_face_masks_used_for_covid_19._id },
  ],
};

const page_covid_19_masks_sentence_2_v1: Sentence = {
  _id: _ids.pages.page_covid_19_masks.paragraphs[0].sentences[1],
  pageID: _ids.pages.page_covid_19_masks._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Masks are likely to be effective at preventing the spread of ",
          styles: [],
        },
        {
          string: "SARS-CoV-2",
          styles: [
            {
              type: "mention",
              variant: "internal",
              value: {
                pageID: _ids.pages.page_sars_cov_2._id,
              },
            },
          ],
        },
        {
          string:
            ", although the level of effectiveness is still being researched.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.are_masks_effective_against_covid_19._id,
    },
  ],
};

const page_covid_19_masks_sentence_3_v1: Sentence = {
  _id: _ids.pages.page_covid_19_masks.paragraphs[0].sentences[2],
  pageID: _ids.pages.page_covid_19_masks._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Based on their likeliness to be effective and the use of the ",
          styles: [],
        },
        {
          string: "precautionary principle",
          styles: [
            {
              type: "mention",
              variant: "external",
              value: {
                url: "https://en.wikipedia.org/wiki/Precautionary_principle",
              },
            },
          ],
        },
        {
          string:
            ", mask use is a wise policy proposal, although these policies must be supported with education on how to effectively use masks, as the misuse of masks can lead people to be overconfident in their safety from the virus.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.should_masks_be_used_to_prevent_covid_19._id,
    },
  ],
};

const page_covid_19_masks_sentence_4_v1: Sentence = {
  _id: _ids.pages.page_covid_19_masks.paragraphs[0].sentences[3],
  pageID: _ids.pages.page_covid_19_masks._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Medical-grade face masks such as N95 respirators have been shown to be effective in blocking 95% of SARS-CoV-2 particles, while cloth masks more effective at ensuring the user releases less aerosol particles when sneezing, coughing, or speaking.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.which_masks_are_effective_against_covid_19._id,
    },
  ],
};

const page_covid_19_masks_sentence_5_v1: Sentence = {
  _id: _ids.pages.page_covid_19_masks.paragraphs[0].sentences[4],
  pageID: _ids.pages.page_covid_19_masks._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Those who are for the mandating of masks believe that since masks prevent the spread of a contagious virus, we cannot rely on the responsibility of individuals to choose to wear masks so governments should step in to ensure people are being responsible to protect their fellow citizens.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.why_do_people_want_mask_mandates._id,
    },
  ],
};

const page_covid_19_masks_sentence_6_v1: Sentence = {
  _id: _ids.pages.page_covid_19_masks.paragraphs[0].sentences[5],
  pageID: _ids.pages.page_covid_19_masks._id,
  current: true,
  versions: [
    {
      createdAt: new Date("2020-12-04"),
      stringArray: [
        {
          string:
            "Although there has been data to suggest the effectiveness of masks, there has been pushback against mask mandates, stemming primarily from citizens of free countries being against the government mandating the need for face coverings, these critics are often for people choosing to wear masks, but are worried about the precedent set by mandates.",
          styles: [],
        },
      ],
    },
  ],
  questionConnections: [
    {
      questionID: _ids.questions.why_are_people_against_wearing_masks._id,
    },
  ],
};

const sentences = [
  page_covid_19_masks_sentence_1_v1,
  page_covid_19_masks_sentence_2_v1,
  page_covid_19_masks_sentence_3_v1,
  page_covid_19_masks_sentence_4_v1,
  page_covid_19_masks_sentence_5_v1,
  page_covid_19_masks_sentence_6_v1,
];

export default sentences;

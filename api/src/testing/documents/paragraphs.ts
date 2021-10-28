import _ids from "../_ids";

import { Paragraph, ParagraphDocument } from "@models";

export interface SeededParagraphs {
  page_sars_cov_2_paragraph_v1: ParagraphDocument;
  page_covid_2019_paragraph_v1: ParagraphDocument;
  page_covid_19_transmission_paragraph_v1: ParagraphDocument;
  page_covid_19_symptoms_paragraph_v1: ParagraphDocument;
  page_covid_19_pandemic_paragraph_v1: ParagraphDocument;
  page_covid_19_masks_paragraph_v1: ParagraphDocument;
  page_covid_19_deaths_paragraph_v1: ParagraphDocument;
  page_covid_19_testing_paragraph_v1: ParagraphDocument;
  page_covid_19_rt_pcr_test_paragraph_v1: ParagraphDocument;
  page_rt_pcr_cycle_threshold_paragraph_v1: ParagraphDocument;
}

const createParagraphs = () => {
  return new Promise<SeededParagraphs>(async (resolve, reject) => {
    try {
      const page_sars_cov_2_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_sars_cov_2.paragraphs[0]._id,
        page: _ids.pages.page_sars_cov_2._id,
        statements: [
          {
            statement: _ids.pages.page_sars_cov_2.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_sars_cov_2.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_sars_cov_2.paragraphs[0].statements[2],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_sars_cov_2.paragraphs[0].statements[3],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_2019_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_2019.paragraphs[0]._id,
        page: _ids.pages.page_covid_2019._id,
        statements: [
          {
            statement: _ids.pages.page_covid_2019.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[0].statements[2],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[0].statements[3],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[0].statements[4],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_2019_paragraph_v2 = new Paragraph({
        _id: _ids.pages.page_covid_2019.paragraphs[1]._id,
        page: _ids.pages.page_covid_2019._id,
        statements: [
          {
            statement: _ids.pages.page_covid_2019.paragraphs[1].statements[0],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[1].statements[1],
            versionIndex: 1,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[1].statements[2],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[1].statements[3],
            versionIndex: 0,
          },
          {
            statement: _ids.pages.page_covid_2019.paragraphs[1].statements[4],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
        sourceEditProposal:
          _ids.paragraphEditProposals.page_covid_19_paragraph_v1_proposal_1._id,
      });

      const page_covid_19_transmission_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_transmission.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_transmission._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_transmission.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_transmission.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_transmission.paragraphs[0].statements[2],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_19_symptoms_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_symptoms.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_symptoms._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_symptoms.paragraphs[0].statements[2],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_19_pandemic_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_pandemic.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_pandemic._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_pandemic.paragraphs[0].statements[0],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_19_masks_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_masks.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_pandemic._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[2],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[3],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[4],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[5],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_19_deaths_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_deaths.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_deaths._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_deaths.paragraphs[0].statements[2],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_19_testing_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_testing.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_testing._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_testing.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_testing.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_testing.paragraphs[0].statements[2],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_testing.paragraphs[0].statements[3],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_testing.paragraphs[0].statements[4],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_covid_19_rt_pcr_test_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0]._id,
        page: _ids.pages.page_covid_19_rt_pcr_test._id,
        statements: [
          {
            statement:
              _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[2],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const page_rt_pcr_cycle_threshold_paragraph_v1 = new Paragraph({
        _id: _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0]._id,
        page: _ids.pages.page_rt_pcr_cycle_threshold._id,
        statements: [
          {
            statement:
              _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0]
                .statements[0],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0]
                .statements[1],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0]
                .statements[2],
            versionIndex: 0,
          },
          {
            statement:
              _ids.pages.page_rt_pcr_cycle_threshold.paragraphs[0]
                .statements[3],
            versionIndex: 0,
          },
        ],
        version: 1,
        mostRecent: true,
      });

      const paragraphs = {
        page_sars_cov_2_paragraph_v1,
        page_covid_2019_paragraph_v1,
        page_covid_2019_paragraph_v2,
        page_covid_19_transmission_paragraph_v1,
        page_covid_19_symptoms_paragraph_v1,
        page_covid_19_pandemic_paragraph_v1,
        page_covid_19_masks_paragraph_v1,
        page_covid_19_deaths_paragraph_v1,
        page_covid_19_testing_paragraph_v1,
        page_covid_19_rt_pcr_test_paragraph_v1,
        page_rt_pcr_cycle_threshold_paragraph_v1,
      };

      // Save all documents
      for (let i = 0; i < Object.values(paragraphs).length; i++) {
        await Object.values(paragraphs)[i].save();
      }

      resolve(paragraphs);
    } catch (e) {
      reject(e);
    }
  });
};

export default createParagraphs;

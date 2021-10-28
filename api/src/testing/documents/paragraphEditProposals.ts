import { ParagraphEditProposal, ParagraphEditProposalDocument } from "@models";
import _ids from "@testing/_ids";
import { EditProposalChangeTypes } from "@typescript/models/ParagraphEditProposal";
import { StyleTypes, StyleVariants } from "@typescript/models/Statement";

export interface ISeededParagraphEditProposals {
  page_covid_2019_paragraph_v1_proposal_1: ParagraphEditProposalDocument;
  page_covid_2019_paragraph_v2_proposal_1: ParagraphEditProposalDocument;
}

const createParagraphEditProposals = () => {
  return new Promise<ISeededParagraphEditProposals>(async (resolve, reject) => {
    try {
      const page_covid_2019_paragraph_v1_proposal_1 = new ParagraphEditProposal(
        {
          _id: _ids.paragraphEditProposals.page_covid_19_paragraph_v1_proposal_1
            ._id,
          author: _ids.users.dev._id,
          description: "Update first recorded case of COVID-19",
          paragraph: _ids.pages.page_covid_2019.paragraphs[0]._id,
          statements: [
            {
              changeType: EditProposalChangeTypes.NONE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[0],
            },
            {
              changeType: EditProposalChangeTypes.EDIT,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[1],
              questions: [
                _ids.questions.where_was_the_first_case_of_covid_19._id,
              ],
              stringArray: [
                {
                  string:
                    "The first case of this was reported by officians in Wuhan, China in December 2019, although it is ",
                  styles: [],
                },
                {
                  string: "now suspected",
                  styles: [
                    {
                      type: "mention",
                      variant: "external",
                      value: {
                        url: "https://www.livescience.com/first-case-coronavirus-found.html",
                      },
                    },
                  ],
                },
                {
                  string:
                    " that the first case dates back to November 17th, 2019.",
                  styles: [],
                },
              ],
            },
            {
              changeType: EditProposalChangeTypes.NONE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[2],
            },
            {
              changeType: EditProposalChangeTypes.REMOVE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[3],
            },
            {
              changeType: EditProposalChangeTypes.NONE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[4],
            },
          ],
        }
      );

      const page_covid_2019_paragraph_v2_proposal_1 = new ParagraphEditProposal(
        {
          _id: _ids.paragraphEditProposals.page_covid_19_paragraph_v2_proposal_1
            ._id,
          author: _ids.users.dev._id,
          description: "Test edit proposal",
          paragraph: _ids.pages.page_covid_2019.paragraphs[1]._id,
          statements: [
            {
              changeType: EditProposalChangeTypes.EDIT,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[0],
              questions: [_ids.questions.what_is_covid_19._id],
              newQuestions: ["What causes the disease COVID-19?"],
              stringArray: [
                {
                  string: "A contagious disease that is caused by ",
                  styles: [],
                },
                {
                  string:
                    "severe actute respiratory syndrome coronavirus 2 (SARS-CoV-2)",
                  styles: [
                    {
                      type: StyleTypes.mention,
                      variant: StyleVariants.internal,
                      value: {
                        page: _ids.pages.page_sars_cov_2._id,
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
            {
              changeType: EditProposalChangeTypes.NONE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[2],
            },
            {
              changeType: EditProposalChangeTypes.NONE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[1],
            },
            {
              changeType: EditProposalChangeTypes.REMOVE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[3],
            },
            {
              changeType: EditProposalChangeTypes.ADD,
              newQuestions: ["What have been the consequences of COVID-19?"],
              stringArray: [
                {
                  string:
                    "COVID-19 has been singularly responsible for the loss of freedoms in the worlds freest countries and has been used as an excuse by governments for tyrannical control over their citizens",
                  styles: [],
                },
              ],
            },
            {
              changeType: EditProposalChangeTypes.NONE,
              statement: _ids.pages.page_covid_2019.paragraphs[0].statements[4],
            },
          ],
        }
      );

      const paragraphEditProposals: ISeededParagraphEditProposals = {
        page_covid_2019_paragraph_v1_proposal_1,
        page_covid_2019_paragraph_v2_proposal_1,
      };

      // Save all documents
      for (let i = 0; i < Object.values(paragraphEditProposals).length; i++) {
        await Object.values(paragraphEditProposals)[i].save();
      }

      resolve(paragraphEditProposals);
    } catch (e) {
      reject(e);
    }
  });
};

export default createParagraphEditProposals;

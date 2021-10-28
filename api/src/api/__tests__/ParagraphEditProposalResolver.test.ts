import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import {
  EditProposalChangeTypes,
  IParagraphEditProposalBuildData,
} from "@typescript/models/ParagraphEditProposal";
import jestLogin from "@testing/jestLogin";
import { StyleTypes, StyleVariants } from "@typescript/models/Statement";
import _ids from "@testing/_ids";
import { ParagraphEditProposalDocument } from "@models";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

let mongoServer: any, documents: SeededDatabase, app: any;
function setupDatabase() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

beforeAll(async (done) => {
  mongoServer = await prepareDatabase();

  app = await createApp();

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("Paragraph Edit Proposal Resolver", () => {
  describe("QUERIES", () => {
    describe("paragraphEditProposal", () => {
      const paragraphEditProposalQuery = `
        query ParagraphEditProposal($id: String!) {
          paragraphEditProposal(id: $id) {
            author {
              firstName
            }
            paragraph {
              version
            }
            description
            statements {
              changeType
              statement {
                current
              }
              stringArray {
                string
                styles {
                  type
                  value {
                    page {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully return all fields of paragraph edit proposal", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: paragraphEditProposalQuery,
              variables: {
                id: documents.paragraphEditProposals
                  .page_covid_2019_paragraph_v2_proposal_1._id,
              },
            });

          expect(res.status).toBe(200);

          const paragraphEditProposal = res.body.data.paragraphEditProposal;
          expect(paragraphEditProposal.author.firstName).toBe(
            documents.users.dev.firstName
          );
          expect(paragraphEditProposal.paragraph.version).toBe(
            documents.paragraphs.page_covid_2019_paragraph_v1.version
          );

          expect(
            paragraphEditProposal.statements[0].stringArray[1].styles[0].value
              .page.title
          ).toBe(documents.pages.page_sars_cov_2.title);
          expect(paragraphEditProposal.statements[0].statement.current).toBe(
            true
          );
        });
      });
    });
  });

  describe("MUTATIONS", () => {
    describe("createParagraphEditProposal", () => {
      const createParagraphEditProposal = `
        mutation CreateParagraphEditProposal($data: ParagraphEditProposalData!) {
          createParagraphEditProposal(data: $data) {
            author {
              _id
            }
            statements {
              changeType
              statement {
                _id
              }
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully search pages", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          // @ts-expect-error
          const data: IParagraphEditProposalBuildData = {
            description: "Test edit proposal",
            paragraph: documents.paragraphs.page_covid_2019_paragraph_v1._id,
            statements: [
              {
                changeType: EditProposalChangeTypes.EDIT,
                statement:
                  documents.paragraphs.page_covid_2019_paragraph_v1.statements[0].statement!.toString(),
                questions: [documents.questions.what_is_covid_19._id],
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
                          page: documents.pages.page_sars_cov_2._id,
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
                statement:
                  documents.paragraphs.page_covid_2019_paragraph_v1.statements[2].statement!.toString(),
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                statement:
                  documents.paragraphs.page_covid_2019_paragraph_v1.statements[1].statement!.toString(),
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                statement:
                  documents.paragraphs.page_covid_2019_paragraph_v1.statements[3].statement!.toString(),
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
                statement:
                  documents.paragraphs.page_covid_2019_paragraph_v1.statements[4].statement!.toString(),
              },
            ],
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: createParagraphEditProposal,
              variables: {
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.createParagraphEditProposal).toBeDefined();

          expect(
            res.body.data.createParagraphEditProposal.statements.length
          ).toBe(data.statements.length);
        });
      });
    });
  });
});

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
              _id
            }
            description
            statementItems {
              changeType
              paragraphStatement {
                statement {
                  current
                }
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
          expect(paragraphEditProposal.paragraph._id.toString()).toBe(
            documents.paragraphs.page_covid_2019_paragraph_v2._id.toString()
          );

          expect(
            paragraphEditProposal.statementItems[0].stringArray[1].styles[0]
              .value.page.title
          ).toBe(documents.pages.page_sars_cov_2.title);
          expect(
            paragraphEditProposal.statementItems[0].paragraphStatement.statement
              .current
          ).toBe(true);
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
            statementItems {
              changeType
              paragraphStatement {
                statement {
                  _id
                }
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
            paragraph: documents.paragraphs.page_covid_2019_paragraph_v2._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.EDIT,
                paragraphStatement: {
                  statement:
                    documents.paragraphs.page_covid_2019_paragraph_v2.statements[0].statement!.toString(),
                  versionIndex: 0,
                },
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
                paragraphStatement: {
                  statement:
                    documents.paragraphs.page_covid_2019_paragraph_v2.statements[2].statement!.toString(),
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    documents.paragraphs.page_covid_2019_paragraph_v2.statements[1].statement!.toString(),
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                paragraphStatement: {
                  statement:
                    documents.paragraphs.page_covid_2019_paragraph_v2.statements[3].statement!.toString(),
                  versionIndex: 0,
                },
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
                paragraphStatement: {
                  statement:
                    documents.paragraphs.page_covid_2019_paragraph_v2.statements[4].statement!.toString(),
                  versionIndex: 0,
                },
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
            res.body.data.createParagraphEditProposal.statementItems.length
          ).toBe(data.statementItems.length);
        });
      });
    });
  });
});

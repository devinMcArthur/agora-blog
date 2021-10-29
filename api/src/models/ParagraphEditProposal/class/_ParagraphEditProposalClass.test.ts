import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { ParagraphEditProposal } from "@models";
import {
  EditProposalChangeTypes,
  IParagraphEditProposalBuildData,
} from "@typescript/models/ParagraphEditProposal";
import _ids from "@testing/_ids";
import { StyleTypes, StyleVariants } from "@typescript/models/Statement";

let documents: SeededDatabase, mongoServer: MongoMemoryServer;
const setupDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

beforeAll(async () => {
  mongoServer = await prepareDatabase();

  await setupDatabase();
});

afterAll(async () => {
  await disconnectAndStopServer(mongoServer);
});

describe("Paragraph Edit Proposal Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should successfully build a paragraph edit proposal", async () => {
          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_2019.paragraphs[1]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.EDIT,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
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
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[2],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[3],
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
                    _ids.pages.page_covid_2019.paragraphs[0].statements[4],
                  versionIndex: 0,
                },
              },
            ],
          };

          const paragraphEditProposal = await ParagraphEditProposal.build(data);

          expect(paragraphEditProposal).toBeDefined();

          expect(paragraphEditProposal.statementItems.length).toBe(
            data.statementItems.length
          );
          expect([
            ...paragraphEditProposal.statementItems.map(
              (statement) => statement.changeType
            ),
          ]).toEqual([
            ...data.statementItems.map((statement) => statement.changeType),
          ]);
          expect([
            ...paragraphEditProposal.statementItems.map(
              (statement) => statement.paragraphStatement?.statement
            ),
          ]).toEqual([
            ...data.statementItems.map(
              (statement) => statement.paragraphStatement?.statement
            ),
          ]);
        });

        test("should successully submit proposal with only order change", async () => {
          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_19_deaths.paragraphs[0]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[2],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
            ],
          };

          const proposal = await ParagraphEditProposal.build(data);

          expect(proposal).toBeDefined();
        });
      });

      describe("error", () => {
        test("should error if creating edit proposal for old paragraph", async () => {
          expect.assertions(1);

          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_2019.paragraphs[0]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[2],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[3],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_2019.paragraphs[0].statements[4],
                  versionIndex: 0,
                },
              },
            ],
          };

          try {
            await ParagraphEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "paragraphEditProposal.validate: can only add edit proposals to current paragraphs"
            );
          }
        });

        test("should error if invalid statement version index is provided", async () => {
          expect.assertions(1);

          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_19_deaths.paragraphs[0]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[2],
                  versionIndex: 1,
                },
              },
            ],
          };

          try {
            await ParagraphEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "paragraphEditProposal.validate: statements[2] - must provide a valid version index"
            );
          }
        });

        test("should error if not all paragraph statements are references in proposal", async () => {
          expect.assertions(1);

          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_19_deaths.paragraphs[0]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.ADD,
                newQuestions: ["What have been the consequences of COVID-19?"],
                stringArray: [
                  {
                    string: "test",
                    styles: [],
                  },
                ],
              },
            ],
          };

          try {
            await ParagraphEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "paragraphEditProposal.validate: must provide a statement item for each existing statement in the paragraph"
            );
          }
        });

        test("should error if statement not belonging to paragraph is provided", async () => {
          expect.assertions(1);

          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_19_deaths.paragraphs[0]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.REMOVE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[2],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_masks.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
            ],
          };

          try {
            await ParagraphEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "paragraphEditProposal.validate: statements[3] - statement does not belong to this paragraph"
            );
          }
        });

        test("should error if proposal contains no edits", async () => {
          expect.assertions(1);

          const data: IParagraphEditProposalBuildData = {
            author: _ids.users.dev._id,
            description: "Test edit proposal",
            paragraph: _ids.pages.page_covid_19_deaths.paragraphs[0]._id,
            statementItems: [
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1],
                  versionIndex: 0,
                },
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                paragraphStatement: {
                  statement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[2],
                  versionIndex: 0,
                },
              },
            ],
          };

          try {
            await ParagraphEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "paragraphEditProposal.validate: this proposal contains no edits"
            );
          }
        });
      });
    });
  });
});

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
            paragraph: _ids.pages.page_covid_2019.paragraphs[0]._id,
            statements: [
              {
                changeType: EditProposalChangeTypes.EDIT,
                statement:
                  _ids.pages.page_covid_2019.paragraphs[0].statements[0],
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
                statement:
                  _ids.pages.page_covid_2019.paragraphs[0].statements[2],
              },
              {
                changeType: EditProposalChangeTypes.NONE,
                statement:
                  _ids.pages.page_covid_2019.paragraphs[0].statements[1],
              },
              {
                changeType: EditProposalChangeTypes.REMOVE,
                statement:
                  _ids.pages.page_covid_2019.paragraphs[0].statements[3],
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
                  _ids.pages.page_covid_2019.paragraphs[0].statements[4],
              },
            ],
          };

          const paragraphEditProposal = await ParagraphEditProposal.build(data);

          expect(paragraphEditProposal).toBeDefined();

          expect(paragraphEditProposal.statements.length).toBe(
            data.statements.length
          );
          expect([
            ...paragraphEditProposal.statements.map(
              (statement) => statement.changeType
            ),
          ]).toEqual([
            ...data.statements.map((statement) => statement.changeType),
          ]);
          expect([
            ...paragraphEditProposal.statements.map(
              (statement) => statement.statement
            ),
          ]).toEqual([
            ...data.statements.map((statement) => statement.statement),
          ]);
        });
      });
    });
  });
});

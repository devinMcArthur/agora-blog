import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import _ids from "@testing/_ids";
import { IParagraphBuildData } from "@typescript/models/Paragraph";
import { Page, Paragraph } from "@models";

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

describe("Paragraph Class", () => {
  describe("BUILD", () => {
    describe("buildFirstParagraph", () => {
      describe("success", () => {
        test("should successfully build a new paragraph and update all other neccessary items", async () => {
          const newPage = new Page({
            title: "test",
            slug: "test",
          });

          const data: IParagraphBuildData = {
            author: documents.users.dev,
            page: newPage,
            statements: [
              {
                newQuestions: [],
                questions: [
                  _ids.questions
                    .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread
                    ._id,
                ],
                quotedStatement:
                  _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                stringArray: [],
              },
            ],
          };

          const { paragraph, statements } = await Paragraph.buildFirst(data);

          for (let i = 0; i < statements.length; i++) {
            await statements[i].save();
          }
          await paragraph.save();
          await newPage.save();

          expect(paragraph).toBeDefined();
          expect(paragraph.statements.length).toBe(1);

          expect(statements.length).toBe(1);

          expect(newPage.paragraphs.length).toBe(1);
          expect(newPage.paragraphs[0]!.toString()).toBe(
            paragraph._id.toString()
          );
        });
      });

      describe("error", () => {
        test("should error if page already has existing paragraphs", async () => {
          expect.assertions(1);

          const data: IParagraphBuildData = {
            author: documents.users.dev,
            page: documents.pages.page_covid_19_deaths,
            statements: [
              {
                newQuestions: [],
                questions: [
                  _ids.questions
                    .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread
                    ._id,
                ],
                quotedStatement:
                  _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0],
                stringArray: [],
              },
            ],
          };

          try {
            await Paragraph.buildFirst(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "must use an edit proposal to add an additional paragraph to a page"
            );
          }
        });

        test("should error if no statements are provided", async () => {
          const newPage = new Page({
            title: "test1",
            slug: "test1",
          });

          expect.assertions(1);

          const data: IParagraphBuildData = {
            author: documents.users.dev,
            page: newPage,
            statements: [],
          };

          try {
            await Paragraph.buildFirst(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "paragraph must have at least one statement"
            );
          }
        });

        test("should error with invalid statement", async () => {
          const newPage = new Page({
            title: "test2",
            slug: "test2",
          });

          expect.assertions(1);

          const data: IParagraphBuildData = {
            author: documents.users.dev,
            page: newPage,
            statements: [
              {
                questions: [],
                newQuestions: [],
                stringArray: [],
              },
            ],
          };

          try {
            await Paragraph.buildFirst(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "must provide either a string array or quoted statement"
            );
          }
        });
      });
    });
  });

  describe("GET", () => {
    describe("getEditProposals", () => {
      describe("success", () => {
        test("should successfully get all edit proposals", async () => {
          const editProposals =
            await documents.paragraphs.page_covid_2019_paragraph_v1.getEditProposals();

          expect(editProposals.length).toBe(1);

          expect(editProposals[0]._id.toString()).toBe(
            documents.paragraphEditProposals.page_covid_2019_paragraph_v1_proposal_1._id.toString()
          );
        });
      });
    });
  });
});

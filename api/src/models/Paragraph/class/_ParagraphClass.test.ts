import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import _ids from "@testing/_ids";
import { IParagraphBuildData } from "@typescript/models/Paragraph";
import { Page, Paragraph, Question, Statement } from "@models";

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

    describe.only("buildFromProposal", () => {
      describe("success", () => {
        test("should successfully create a new paragraph", async () => {
          expect(
            documents.paragraphs.page_covid_2019_paragraph_v2.mostRecent
          ).toBe(true);

          const editProposal =
            documents.paragraphEditProposals
              .page_covid_2019_paragraph_v2_proposal_1;

          const { oldParagraph, newParagraph, statements, page } =
            await Paragraph.buildFromProposal(editProposal);

          for (let i = 0; i < statements.length; i++) {
            await statements[i].save();
          }

          await newParagraph.save();

          await oldParagraph.save();

          await page.save();

          // check old paragraph

          expect(oldParagraph.mostRecent).toBe(false);
          expect(oldParagraph.page!.toString()).toBe(
            newParagraph.page!.toString()
          );

          // check page

          expect(page.paragraphs[page.paragraphs.length - 1]!.toString()).toBe(
            newParagraph._id.toString()
          );

          // new paragraph

          expect(newParagraph.page!.toString()).toBe(
            documents.pages.page_covid_2019._id.toString()
          );

          expect(newParagraph.mostRecent).toBeTruthy();

          expect(newParagraph.sourceEditProposal!.toString()).toBe(
            documents.paragraphEditProposals.page_covid_2019_paragraph_v2_proposal_1._id.toHexString()
          );

          expect(newParagraph.statements.length).toBe(6);

          // check statements

          // statement1 - edit
          const paragraphStatement1 = newParagraph.statements[0];
          const statement1 = (await Statement.getById(
            paragraphStatement1.statement!.toString()
          ))!;
          expect(paragraphStatement1.versionIndex).toBe(1);
          expect(paragraphStatement1.statement!.toString()).toBe(
            editProposal.statementItems[0].paragraphStatement?.statement!.toString()
          );

          expect(statement1.versions.length).toBe(2);
          const statement1Version = statement1.versions[1];
          expect(statement1Version.sourceEditProposal!.toString()).toBe(
            editProposal._id.toString()
          );
          expect(statement1Version.quotedStatement!.toString()).toBe(
            editProposal.statementItems[0].quotedStatement!.toString()
          );

          expect(statement1Version.questions.length).toBe(2);
          expect(statement1Version.questions.length).toBe(2);
          expect(statement1Version.questions[0]!.toString()).toBe(
            editProposal.statementItems[0].questions[0]!.toString()
          );
          const statement1NewQuestion1 = await Question.getById(
            statement1Version.questions[1]!.toString()
          );
          expect(statement1NewQuestion1?.question).toBe(
            editProposal.statementItems[0].newQuestions[0]
          );

          // statement2 - none
          const paragraphStatement2 = newParagraph.statements[1];
          const statement2 = (await Statement.getById(
            paragraphStatement2.statement!.toString()
          ))!;
          expect(paragraphStatement2.versionIndex).toBe(0);
          expect(paragraphStatement2.statement!.toString()).toBe(
            editProposal.statementItems[1].paragraphStatement?.statement!.toString()
          );

          expect(statement2.versions.length).toBe(1);

          // statement3 - edit
          const paragraphStatement3 = newParagraph.statements[2];
          const statement3 = (await Statement.getById(
            paragraphStatement3.statement!.toString()
          ))!;
          expect(paragraphStatement3.versionIndex).toBe(2);
          expect(paragraphStatement3.statement!.toString()).toBe(
            editProposal.statementItems[2].paragraphStatement?.statement!.toString()
          );

          expect(statement3.versions.length).toBe(3);

          // removedStatement - removed
          const removedStatement = (await Statement.getById(
            editProposal.statementItems[3].paragraphStatement!.statement!.toString()
          ))!;
          expect(removedStatement.current).toBeFalsy();
          expect(newParagraph.statements[3].statement!.toString()).not.toBe(
            removedStatement._id.toString()
          );

          // statement4 - added
          const paragraphStatement4 = newParagraph.statements[3];
          const statement4 = (await Statement.getById(
            paragraphStatement4.statement!.toString()
          ))!;

          expect(statement4.versions.length).toBe(1);
          expect(statement4.versions[0].quotedStatement!.toString()).toBe(
            editProposal.statementItems[4].quotedStatement!.toString()
          );
          expect(statement4.versions[0].questions.length).toBe(1);
          const statement4Question1 = await Question.getById(
            statement4.versions[0].questions[0]!.toString()
          );
          expect(statement4Question1!.question).toBe(
            editProposal.statementItems[4].newQuestions[0]
          );

          // statement5 - added
          const paragraphStatement5 = newParagraph.statements[4];
          const statement5 = (await Statement.getById(
            paragraphStatement5.statement!.toString()
          ))!;

          expect(statement5.current).toBeTruthy();
          expect(statement5.versions.length).toBe(1);

          expect(statement5.versions[0].questions.length).toBe(1);

          expect(statement5.versions[0].stringArray.length).toBe(3);

          // statement6 - none
          const paragraphStatement6 = newParagraph.statements[5];
          const statement6 = (await Statement.getById(
            paragraphStatement6.statement!.toString()
          ))!;
          expect(paragraphStatement6.versionIndex).toBe(0);
          expect(paragraphStatement6.statement!.toString()).toBe(
            editProposal.statementItems[6].paragraphStatement?.statement!.toString()
          );

          expect(statement6.versions.length).toBe(1);
        });
      });

      describe("error", () => {
        test("should error if proposal is outdated", async () => {
          expect.assertions(1);

          try {
            await Paragraph.buildFromProposal(
              documents.paragraphEditProposals
                .page_covid_2019_paragraph_v1_proposal_1
            );
          } catch (e: any) {
            expect(e.message).toBe("this edit proposal is outdated");
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

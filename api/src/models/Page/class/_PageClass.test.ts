import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { Page } from "@models";
import { IPageBuildData } from "@typescript/models/Page";
import _ids from "@testing/_ids";
import { StyleTypes } from "@typescript/models/Statement";
import { createReadStream } from "fs";

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

describe("Page Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should should successfully build a new page", async () => {
          const data: IPageBuildData = {
            author: documents.users.dev,
            title: "New Page",
            paragraph: {
              statements: [
                {
                  newQuestions: ["This is a new question"],
                  questions: [
                    documents.questions
                      .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread
                      ._id,
                  ],
                  stringArray: [],
                  quotedStatement:
                    _ids.pages.page_covid_19_deaths.paragraphs[0].statements[0].toString(),
                },
                {
                  newQuestions: ["Does this have an image?"],
                  questions: [],
                  stringArray: [
                    {
                      string: "",
                      styles: [
                        {
                          type: StyleTypes.image,
                          value: {
                            image: {
                              file: {
                                stream: createReadStream(
                                  "src/testing/assets/viral-culture-per-ct-value.jpg"
                                ),
                                mimetype: "image/jpeg",
                              },
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          };

          const { page, paragraph, statements } = await Page.build(data);

          await page.save();
          await paragraph.save();
          for (let i = 0; i < statements.length; i++)
            await statements[i].save();

          expect(page).toBeDefined();
          expect(paragraph).toBeDefined();
          expect(statements.length).toBe(2);

          expect(page.paragraphs.length).toBe(1);
          expect(page.paragraphs[0]!.toString()).toBe(paragraph._id.toString());

          expect(paragraph.page!.toString()).toBe(page._id.toString());
          expect(paragraph.statements.length).toBe(2);

          expect(paragraph.statements[0]).toMatchObject({
            versionIndex: 0,
            statement: statements[0]._id,
          });

          expect(paragraph.statements[1]).toMatchObject({
            versionIndex: 0,
            statement: statements[1]._id,
          });

          expect(
            statements[1].versions[0].stringArray[0].styles[0].value.image?.file
          ).toBeDefined();
        });
      });
    });
  });

  describe("GET", () => {
    describe.skip("search", () => {
      describe("success", () => {
        test("should successfully search database w/ lowercase", async () => {
          const results = await Page.search("mask");

          expect(results.length).toBe(1);
        });
      });
    });

    describe("getDescription", () => {
      describe("success", () => {
        test("should successfully get description for page", async () => {
          const description =
            await documents.pages.page_covid_2019.getDescription();

          expect(description).toBe(
            "A contagious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)."
          );
        });
      });
    });
  });
});

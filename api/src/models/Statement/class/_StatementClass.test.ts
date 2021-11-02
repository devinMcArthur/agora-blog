import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { File, Page, Question, Statement } from "@models";
import {
  IStatementBuildData,
  StyleTypes,
  StyleVariants,
} from "@typescript/models/Statement";
import _ids from "@testing/_ids";
import { MimeTypeEnum } from "@typescript/models/File";
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

describe("Statement Class", () => {
  describe("BUILD", () => {
    describe("success", () => {
      test("should should successfully build a new statement", async () => {
        const data: IStatementBuildData = {
          author: documents.users.dev._id,
          page: documents.pages.page_covid_19_deaths._id,
          version: {
            newQuestions: ["New Question"],
            questions: [
              documents.questions
                .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread
                ._id,
            ],
            stringArray: [
              {
                string: "bold & italic",
                styles: [
                  {
                    type: StyleTypes.bold,
                  },
                  {
                    type: StyleTypes.italic,
                  },
                ],
              },
              {
                string: "internal mention",
                styles: [
                  {
                    type: StyleTypes.mention,
                    variant: StyleVariants.internal,
                    value: {
                      page: documents.pages.page_covid_19_masks._id,
                    },
                  },
                ],
              },
              {
                string: "external mention",
                styles: [
                  {
                    type: StyleTypes.mention,
                    variant: StyleVariants.external,
                    value: {
                      url: "www.google.com",
                    },
                  },
                ],
              },
              {
                string: "variable",
                styles: [
                  {
                    type: StyleTypes.variable,
                    value: {
                      variable:
                        documents.variables.var_global_cases_covid_19._id,
                    },
                  },
                ],
              },
            ],
          },
        };

        const statement = await Statement.build(data);

        await statement.save();

        expect(statement).toBeDefined();

        expect(statement.versions.length).toBe(1);

        const version = statement.versions[0];

        // new question
        const newQuestion = await Question.getById(
          version.questions[1]!.toString()
        );
        expect(newQuestion).toBeDefined();
        expect(newQuestion!.question).toBe(data.version.newQuestions[0]);

        // contains new question
        expect(statement.versions[0].questions.length).toBe(
          data.version.questions.length + data.version.newQuestions.length
        );

        // bold & italic
        expect(version.stringArray[0].styles.length).toBe(2);

        // internal mention
        expect(version.stringArray[1].styles.length).toBe(1);
        expect(version.stringArray[1].styles[0].value.page).toBeDefined();
        expect(version.stringArray[1].styles[0].value.page!.toString()).toBe(
          data.version.stringArray[1].styles[0].value?.page?.toString()
        );

        // external mention
        expect(version.stringArray[2].styles.length).toBe(1);
        expect(version.stringArray[2].styles[0].value.url).toBeDefined();
        expect(version.stringArray[2].styles[0].value.url).toBe(
          data.version.stringArray[2].styles[0].value!.url
        );

        // variable
        expect(version.stringArray[3].styles.length).toBe(1);
        expect(version.stringArray[3].styles[0].value.variable).toBeDefined();
        expect(
          version.stringArray[3].styles[0].value.variable?.toString()
        ).toBe(
          data.version.stringArray[3].styles[0].value?.variable?.toString()
        );
      });

      test("should successfully create a quoted statement", async () => {
        const data: IStatementBuildData = {
          author: documents.users.dev._id,
          page: documents.pages.page_covid_19_deaths._id,
          version: {
            quotedStatement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[0],
            stringArray: [],
            questions: [
              documents.questions.are_masks_effective_against_covid_19._id,
            ],
            newQuestions: [],
          },
        };

        const statement = await Statement.build(data);

        await statement.save();

        expect(statement).toBeDefined();

        expect(statement.versions[0].quotedStatement!.toString()).toBe(
          data.version.quotedStatement?.toString()
        );
      });

      test("should successfully create a statement w/ an image", async () => {
        const data: IStatementBuildData = {
          author: documents.users.dev._id,
          page: documents.pages.page_covid_19_pandemic._id,
          version: {
            questions: [
              _ids.questions.are_masks_effective_against_covid_19._id,
            ],
            newQuestions: [],
            stringArray: [
              {
                styles: [
                  {
                    type: StyleTypes.image,
                    value: {
                      image: {
                        caption: "caption",
                        sourceUrl: "www.google.ca",
                        file: {
                          mimetype: MimeTypeEnum.JPEG,
                          stream: createReadStream(
                            "src/testing/assets/viral-culture-per-ct-value.jpg"
                          ),
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
        };

        const statement = await Statement.build(data);

        await statement.save();

        expect(statement).toBeDefined();

        const fileId =
          statement.versions[0].stringArray[0].styles[0].value.image?.file;
        expect(fileId).toBeDefined();

        const file = await File.getById(fileId!.toString());
        expect(file).toBeDefined();
      });

      test("should successfully create a statement with a matching newquestion", async () => {
        const data: IStatementBuildData = {
          author: documents.users.dev._id,
          page: documents.pages.page_covid_19_deaths._id,
          version: {
            quotedStatement:
              _ids.pages.page_covid_19_masks.paragraphs[0].statements[0],
            stringArray: [],
            questions: [
              documents.questions.are_masks_effective_against_covid_19._id,
            ],
            newQuestions: [
              documents.questions.how_is_covid_19_transmitted.question,
            ],
          },
        };

        const statement = await Statement.build(data);

        expect(statement).toBeDefined();

        expect(statement.versions.length).toBe(1);

        expect(statement.versions[0].questions.length).toBe(2);

        expect(statement.versions[0].questions[1]!.toString()).toBe(
          documents.questions.how_is_covid_19_transmitted._id.toString()
        );
      });
    });

    describe("error", () => {
      test("should error if stringArray is populated w/ quoted statement", async () => {
        expect.assertions(1);

        const data: IStatementBuildData = {
          author: documents.users.dev._id,
          page: documents.pages.page_covid_19_deaths._id,
          version: {
            newQuestions: [],
            questions: [
              documents.questions
                .are_asymptomatic_cases_of_covid_19_a_large_contributer_to_spread
                ._id,
            ],
            stringArray: [
              {
                string: "hello there",
                styles: [],
              },
            ],
            quotedStatement:
              _ids.pages.page_covid_19_pandemic.paragraphs[0].statements[0],
          },
        };

        try {
          await Statement.build(data);
        } catch (e: any) {
          expect(e.message).toBe(
            "must provide either a string array or quoted statement"
          );
        }
      });
    });
  });
});

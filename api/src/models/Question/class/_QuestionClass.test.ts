import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { Question } from "@models";
import { IQuestionBuildData } from "@typescript/models/Question";

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

describe("Question Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("error", () => {
        test("should not create a new question if question already exists", async () => {
          const existingQuestion =
            documents.questions.how_is_cycle_threshold_used;

          const data: IQuestionBuildData = {
            question: existingQuestion.question.toLowerCase(),
          };

          const newQuestion = await Question.build(data);

          expect(newQuestion._id.toString()).toBe(
            existingQuestion._id.toString()
          );
        });
      });
    });
  });

  describe("GET", () => {
    describe("search", () => {
      describe("success", () => {
        test.skip("should successfully search database w/ lowercase", async () => {
          const results = await Question.search("deat");

          expect(results.length).toBe(2);
        });
      });
    });

    describe("getStatementReferences", () => {
      describe("success", () => {
        test("should get a statement", async () => {
          const statements =
            await documents.questions.what_is_covid_19.getStatementReferences();

          expect(statements.length).toBe(1);
        });

        test("should not get any statements if page is avoided", async () => {
          const statements =
            await documents.questions.what_is_covid_19.getStatementReferences({
              avoidPage: documents.pages.page_covid_2019._id,
            });

          expect(statements.length).toBe(0);
        });

        test.skip("should paginate return", async () => {
          const statements =
            await documents.questions.what_is_covid_19.getStatementReferences({
              limit: 0,
            });

          expect(statements.length).toBe(0);
        });
      });
    });

    describe("getList", () => {
      describe("success", () => {
        test("should successully get list w/ pagination", async () => {
          const questions1 = await Question.getList({
            pageLimit: 5,
            offset: 0,
          });

          expect(questions1.length).toBe(5);

          const questions2 = await Question.getList({
            pageLimit: 5,
            offset: 5,
          });

          expect(questions2.length).toBe(5);

          const fullQuestions = await Question.getList({
            pageLimit: 10,
            offset: 0,
          });

          expect(fullQuestions).toEqual([...questions1, ...questions2]);
        });
      });
    });
  });
});

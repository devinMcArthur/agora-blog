import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { Question } from "@models";

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
  describe("GET", () => {
    describe("search", () => {
      describe("success", () => {
        test("should successfully search database w/ lowercase", async () => {
          const results = await Question.search("deat");

          expect(results.length).toBe(2);
        });
      });
    });

    describe.only("getStatementReferences", () => {
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
  });
});

import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";

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

describe("Question Resolver", () => {
  describe("QUERIES", () => {
    describe("searchQuestions", () => {
      const searchQuestionsQuery = `
        query SearchQuestions($searchString: String!) {
          searchQuestions(searchString: $searchString) {
            question
          }
        }
      `;

      describe("success", () => {
        test.skip("should successfully search questions", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: searchQuestionsQuery,
              variables: {
                searchString: "deat",
              },
            });

          expect(res.status).toBe(200);

          console.log(res.body);

          expect(res.body.data.searchQuestions.length).toBe(2);
        });
      });
    });
  });
});

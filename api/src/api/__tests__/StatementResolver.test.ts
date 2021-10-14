import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
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

describe("Statement Resolver", () => {
  describe("QUERIES", () => {
    describe("statementsFromQuestion", () => {
      const statementsFromQuestionQuery = `
        query StatementsFromQuestion($questionId: ID!, $options: StatementsFromQuestionOptions) {
          statementsFromQuestion(questionId: $questionId, options: $options) {
            _id
          }
        }
      `;

      describe("success", () => {
        test("should successfully get statements", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: statementsFromQuestionQuery,
              variables: {
                questionId: _ids.questions.what_is_covid_19._id,
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.statementsFromQuestion.length).toBe(1);
        });

        test("should not return statement w/ avoided page", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: statementsFromQuestionQuery,
              variables: {
                questionId: _ids.questions.what_is_covid_19._id,
                options: {
                  avoidPage: _ids.pages.page_covid_2019._id,
                },
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.statementsFromQuestion.length).toBe(0);
        });
      });
    });
  });
});

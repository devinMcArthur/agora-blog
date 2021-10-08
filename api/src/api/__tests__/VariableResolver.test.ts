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

describe("Variable Resolver", () => {
  describe("QUERIES", () => {
    describe("searchVariables", () => {
      const searchVariablesQuery = `
        query SearchVariables($searchString: String!) {
          searchVariables(searchString: $searchString) {
            title
          }
        }
      `;

      describe("success", () => {
        test("should successfully search variables", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: searchVariablesQuery,
              variables: {
                searchString: "deat",
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.searchVariables[0].title).toBe(
            documents.variables.var_global_deaths_covid_19.title
          );
        });
      });
    });
  });
});

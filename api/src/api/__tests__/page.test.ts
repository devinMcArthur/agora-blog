import request from "supertest";
import { createTestClient } from "apollo-server-testing";

import app from "../../app";
import { prepareDatabase, disconnectAndStopServer } from "../../testDB/jestDB";
import seedDatabase from "../../testDB/seedDatabase";
import { apolloServer } from "../../server";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const { query } = createTestClient(apolloServer);

let mongoServer: any, documents: any;
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

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("Page Schema", () => {
  describe("queries", () => {
    describe("page", () => {
      test("should get page object", async (done) => {
        const res = await request(app).post("/graphql");

        console.log(res);

        done();
      });
    });
  });
});

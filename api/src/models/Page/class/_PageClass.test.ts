import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { Page } from "@models";

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
    describe("success", () => {
      test("should should successfully build a new page", async () => {});
    });
  });

  describe("GET", () => {
    describe("search", () => {
      describe("success", () => {
        test("should successfully search database w/ lowercase", async () => {
          const results = await Page.search("mask");

          expect(results.length).toBe(1);
        });
      });
    });
  });
});

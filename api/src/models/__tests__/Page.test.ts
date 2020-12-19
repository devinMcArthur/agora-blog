import mongoose from "mongoose";

import Page from "../Page";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

import seedDatabase from "../../testDB/seedDatabase";
import jestDB from "../../testDB/jestDB";

let mongoServer: any;

let page_sars_cov_2: any;

const setupDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      let documents = await seedDatabase();

      page_sars_cov_2 = documents.pages.page_sars_cov_2;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

beforeAll(async (done) => {
  mongoServer = await jestDB.prepareDatabase(mongoServer);

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await jestDB.disconnectAndStopServer(mongoServer);
  done();
});

describe("Page", () => {
  describe("GET", () => {
    describe("getByID", () => {
      describe("success", () => {
        test("should get Page by ID", async () => {
          const page = await Page.getByID(page_sars_cov_2._id);

          expect(page).toBeDefined();
          expect(page?._id.toString()).toBe(page_sars_cov_2._id.toString());
        });
      });
    });
  });

  describe("POPULATE", () => {
    describe("populateNormal", () => {
      describe("success", () => {
        test("page should be properly populated", async (done) => {
          const populatedPage = await page_sars_cov_2.populateNormal();

          console.log(populatedPage);

          done();
        });
      });
    });
  });
});

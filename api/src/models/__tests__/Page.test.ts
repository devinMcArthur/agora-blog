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

describe("Page", () => {});

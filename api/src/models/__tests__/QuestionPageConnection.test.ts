import QuestionPageConnection from "../QuestionPageConnection";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

import seedDatabase from "../../testDB/seedDatabase";
import jestDB from "../../testDB/jestDB";

let mongoServer: any;

let how_is_cycle_threshold_used: any;

const setupDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      let documents = await seedDatabase();

      how_is_cycle_threshold_used =
        documents.questions.how_is_cycle_threshold_used;

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

describe("QuestionPageConnection", () => {
  describe("GET", () => {
    describe("getByQuestionID", () => {
      describe("success", () => {
        test("should get connections by question ID", async () => {
          const questionPageConnections = await QuestionPageConnection.getByQuestionID(
            how_is_cycle_threshold_used._id
          );

          expect(questionPageConnections.length).toBe(1);
        });
      });
    });
  });
});

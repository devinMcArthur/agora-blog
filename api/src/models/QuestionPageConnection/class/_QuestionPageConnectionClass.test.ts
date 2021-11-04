import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { QuestionPageConnection, Statement } from "@models";
import _ids from "@testing/_ids";

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

describe("Question Page Connection Class", () => {
  describe("GENERAL", () => {
    describe("statement post save update", () => {
      test("should successfully update connections", async () => {
        const statement = (await Statement.getById(
          _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[1]
        ))!;
        const initialConnections = await QuestionPageConnection.getByStatement(
          statement
        );

        // check initial connections

        expect(initialConnections.length).toBe(3);

        expect(initialConnections[0].statement!.toString()).toBe(
          statement._id.toString()
        );
        expect(initialConnections[0].question!.toString()).toBe(
          documents.questions.what_is_the_effectiveness_of_rt_pcr_covid_19_tests._id.toString()
        );
        expect(initialConnections[0].referrerPage!.toString()).toBe(
          statement.page!.toString()
        );

        expect(initialConnections[1].statement!.toString()).toBe(
          statement._id.toString()
        );
        expect(initialConnections[1].question!.toString()).toBe(
          documents.questions.what_is_the_false_positive_rate_of_rt_pcr_covid_19_tests._id.toString()
        );
        expect(initialConnections[1].referrerPage!.toString()).toBe(
          statement.page!.toString()
        );

        expect(initialConnections[2].statement!.toString()).toBe(
          statement._id.toString()
        );
        expect(initialConnections[2].question!.toString()).toBe(
          documents.questions.what_is_the_false_negative_rate_of_rt_pcr_covid_19_tests._id.toString()
        );
        expect(initialConnections[2].referrerPage!.toString()).toBe(
          statement.page!.toString()
        );

        // make update to statement

        statement.versions[1] = {
          ...JSON.parse(JSON.stringify(statement.versions[0])),
          questions: [
            documents.questions
              .what_is_the_effectiveness_of_rt_pcr_covid_19_tests._id,
            documents.questions.what_tests_are_used_to_test_for_covid_19._id,
          ],
        };
        await statement.save();

        // check new connections

        const newConnections = await QuestionPageConnection.getByStatement(
          statement
        );

        expect(newConnections.length).toBe(2);

        expect(newConnections[0].statement!.toString()).toBe(
          statement._id.toString()
        );
        expect(newConnections[0].question!.toString()).toBe(
          documents.questions.what_is_the_effectiveness_of_rt_pcr_covid_19_tests._id.toString()
        );
        expect(newConnections[0].referrerPage!.toString()).toBe(
          statement.page!.toString()
        );

        expect(newConnections[1].statement!.toString()).toBe(
          statement._id.toString()
        );
        expect(newConnections[1].question!.toString()).toBe(
          documents.questions.what_tests_are_used_to_test_for_covid_19._id.toString()
        );
        expect(newConnections[1].referrerPage!.toString()).toBe(
          statement.page!.toString()
        );
      });

      test("should successfully remove all connections if statement is no longer current", async () => {
        const statement = (await Statement.getById(
          _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[2]
        ))!;
        const initialConnections = await QuestionPageConnection.getByStatement(
          statement
        );

        expect(initialConnections.length).toBe(2);

        statement.current = false;
        await statement.save();

        const newConnections = await QuestionPageConnection.getByStatement(
          statement
        );

        expect(newConnections.length).toBe(0);
      });
    });
  });
});

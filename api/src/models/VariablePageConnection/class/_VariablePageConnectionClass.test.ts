import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { Statement, VariablePageConnection } from "@models";
import _ids from "@testing/_ids";
import { StyleTypes } from "@typescript/models/Statement";

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

describe("Variable Page Connection Class", () => {
  describe("GENERAL", () => {
    describe("statement post save update", () => {
      test("should successfully update variable page connections on statement update", async () => {
        const statement = (await Statement.getById(
          _ids.pages.page_covid_19_rt_pcr_test.paragraphs[0].statements[1]
        ))!;
        const initialConnections = await VariablePageConnection.getByStatement(
          statement
        );

        // initial connections check

        expect(initialConnections.length).toBe(3);

        const referrerPage = statement.page!.toString();
        const statementId = statement._id.toString();

        expect(initialConnections[0].statement!.toString()).toBe(statementId);
        expect(initialConnections[0].referrerPage!.toString()).toBe(
          referrerPage
        );
        expect(initialConnections[0].variable!.toString()).toBe(
          documents.variables.var_covid_19_rt_pcr_test_sensitivity._id.toString()
        );

        expect(initialConnections[1].statement!.toString()).toBe(statementId);
        expect(initialConnections[1].referrerPage!.toString()).toBe(
          referrerPage
        );
        expect(initialConnections[1].variable!.toString()).toBe(
          documents.variables.var_covid_19_rt_pcr_test_specificity._id.toString()
        );

        expect(initialConnections[2].statement!.toString()).toBe(statementId);
        expect(initialConnections[2].referrerPage!.toString()).toBe(
          referrerPage
        );
        expect(initialConnections[2].variable!.toString()).toBe(
          documents.variables.var_covid_19_rt_pcr_test_false_positive_rate._id.toString()
        );

        // edit statement

        statement.versions[1] = {
          ...JSON.parse(JSON.stringify(statement.versions[0])),
        };
        statement.versions[1].stringArray[1].styles = [];
        statement.versions[1].stringArray[5].styles = [
          {
            type: StyleTypes.variable,
            value: {
              variable: documents.variables.var_global_deaths_covid_19._id,
            },
          },
        ];
        await statement.save();

        // check new connections

        const newConnections = await VariablePageConnection.getByStatement(
          statement
        );

        expect(newConnections.length).toBe(2);

        expect(newConnections[0].variable!.toString()).toBe(
          documents.variables.var_covid_19_rt_pcr_test_specificity._id.toString()
        );

        expect(newConnections[1].variable!.toString()).toBe(
          documents.variables.var_global_deaths_covid_19._id.toString()
        );
      });

      test("should successfully remove all existing connections if statement is no longer current", async () => {
        const statement = (await Statement.getById(
          _ids.pages.page_covid_19_deaths.paragraphs[0].statements[1]
        ))!;
        const initialConnections = await VariablePageConnection.getByStatement(
          statement
        );

        expect(initialConnections.length).toBe(1);

        statement.current = false;
        await statement.save();

        const newConnections = await VariablePageConnection.getByStatement(
          statement
        );

        expect(newConnections.length).toBe(0);
      });
    });
  });
});

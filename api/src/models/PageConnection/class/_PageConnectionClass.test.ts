import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { PageConnection, Statement } from "@models";
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

describe("Page Connection Class", () => {
  describe("GENERAL", () => {
    describe("statement post save update", () => {
      test("should successfully update the page connection collection", async () => {
        const statement = await Statement.getById(
          _ids.pages.page_sars_cov_2.paragraphs[0].statements[0]
        );
        const initialConnections = await PageConnection.getByStatement(
          statement!
        );

        // Initial Check

        expect(initialConnections.length).toBe(2);

        expect(initialConnections[0].statements[0]!.toString()).toBe(
          statement?._id.toString()
        );
        expect(initialConnections[0].referrerPage!.toString()).toBe(
          statement!.page!.toString()
        );
        expect(initialConnections[0].referencedPage!.toString()).toBe(
          documents.pages.page_covid_2019._id.toString()
        );

        expect(initialConnections[1].statements[0]!.toString()).toBe(
          statement?._id.toString()
        );
        expect(initialConnections[1].referrerPage!.toString()).toBe(
          statement!.page!.toString()
        );
        expect(initialConnections[1].referencedPage!.toString()).toBe(
          documents.pages.page_covid_19_pandemic._id.toString()
        );

        // Update statement mentions

        statement!.versions[1] = JSON.parse(
          JSON.stringify(statement!.versions[0])
        );
        statement!.versions[1].stringArray[1].styles[0].value.page =
          documents.pages.page_covid_19_deaths._id;
        await statement?.save();

        // Post update check

        const newConnections = await PageConnection.getByStatement(statement!);

        expect(newConnections.length).toBe(2);

        expect(newConnections[0].statements[0]!.toString()).toBe(
          statement?._id.toString()
        );
        expect(newConnections[0].referrerPage!.toString()).toBe(
          statement!.page!.toString()
        );
        expect(newConnections[0].referencedPage!.toString()).toBe(
          documents.pages.page_covid_19_pandemic._id.toString()
        );

        expect(newConnections[1].statements[0]!.toString()).toBe(
          statement?._id.toString()
        );
        expect(newConnections[1].referrerPage!.toString()).toBe(
          statement!.page!.toString()
        );
        expect(newConnections[1].referencedPage!.toString()).toBe(
          documents.pages.page_covid_19_deaths._id.toString()
        );
      });

      test("should successfully update for a quoted statement", async () => {
        const statement = await Statement.getById(
          _ids.pages.page_sars_cov_2.paragraphs[0].statements[0]
        );
        const initialConnections = await PageConnection.getByStatement(
          statement!
        );

        expect(initialConnections.length).toBe(2);

        statement!.versions[1] = {
          quotedStatement:
            documents.paragraphs.page_covid_19_deaths_paragraph_v1.statements[0]
              .statement,
          questions: [
            documents.questions.how_many_covid_19_deaths_have_there_been._id,
          ],
          stringArray: [],
          createdAt: new Date(),
        };
        await statement?.save();

        const newConnections = await PageConnection.getByStatement(statement!);

        expect(newConnections.length).toBe(1);

        expect(newConnections[0].referrerPage!.toString()).toBe(
          statement?.page!.toString()
        );
        expect(newConnections[0].referencedPage!.toString()).toBe(
          documents.pages.page_covid_19_deaths._id.toHexString()
        );
        expect(newConnections[0].statements[0]!.toString()).toBe(
          statement?._id.toString()
        );
      });

      test("should fully remove connections", async () => {
        const statement = await Statement.getById(
          _ids.pages.page_sars_cov_2.paragraphs[0].statements[3]
        );
        const initialConnections = await PageConnection.getByStatement(
          statement!
        );

        expect(initialConnections.length).toBe(1);

        statement!.versions[1] = {
          ...JSON.parse(JSON.stringify(statement!.versions[0])),
          stringArray: [
            {
              string: "Hello there",
              styles: [],
            },
          ],
        };
        await statement?.save();

        const newConnections = await PageConnection.getByStatement(statement!);

        expect(newConnections.length).toBe(0);
      });

      test("should remove connections if statement is no longer current", async () => {
        const statement = await Statement.getById(
          _ids.pages.page_covid_2019.paragraphs[0].statements[0]
        );
        const initialConnections = await PageConnection.getByStatement(
          statement!
        );

        expect(initialConnections.length).toBe(1);

        statement!.current = false;
        await statement?.save();

        const newConnections = await PageConnection.getByStatement(statement!);

        expect(newConnections.length).toBe(0);
      });

      test("should only make a single connection if multiple statements reference", async () => {
        const connections = await PageConnection.find({
          referencedPage: documents.pages.page_covid_2019._id,
          referrerPage: documents.pages.page_covid_19_testing._id,
        });

        expect(connections.length).toBe(1);
      });
    });
  });
});

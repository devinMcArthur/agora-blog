import { Statement } from "@models";
import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import statementToString from "@utils/statementToString";
import MongoMemoryServer from "mongodb-memory-server-core";

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

describe("statementToString", () => {
  test("should successfully make string out of normal statement", async () => {
    const statement = await Statement.getById(
      documents.paragraphs.page_covid_2019_paragraph_v2.statements[0].statement!.toString()
    );

    const string = await statementToString(statement!);

    expect(string).toBe(
      "A contagious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2)."
    );
  });

  test("should succesfully create string from statement w/ quoted statement", async () => {
    const statement = await Statement.getById(
      documents.paragraphs.page_covid_2019_paragraph_v2.statements[2].statement!.toString()
    );

    const string = await statementToString(statement!);

    expect(string).toBe(
      "Common symptoms of COVID-19 include fever, cough, fatigue, breathing difficulties, and loss of smell and taste; these symptoms often begin one to fourteen days after getting the virus."
    );
  });

  test("should successfully create string from statement w/ variable", async () => {
    const statement = await Statement.getById(
      documents.paragraphs.page_covid_19_deaths_paragraph_v1.statements[1].statement!.toString()
    );

    const string = await statementToString(statement!);

    expect(string).toBe(
      "As of this moment, more than 5,077,932 deaths have been attributed to COVID-19."
    );
  });

  test("should successfully create string from statement w/ quote", async () => {
    const statement = await Statement.getById(
      documents.paragraphs.page_covid_2019_paragraph_v2.statements[4].statement!.toString()
    );

    const string = await statementToString(statement!);

    expect(string).toBe(
      'The mainstream consensus states that: "As of this moment, more than 5,077,932 deaths have been attributed to COVID-19."'
    );
  });
});

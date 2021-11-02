import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { File, Page, Statement } from "@models";
import {
  IStatementBuildData,
  StyleTypes,
  StyleVariants,
} from "@typescript/models/Statement";
import _ids from "@testing/_ids";
import { FileBuildData, MimeTypeEnum } from "@typescript/models/File";
import { createReadStream, fstat } from "fs";
import { getFile } from "@utils/digitalOceanSpaces";

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

describe("File Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should successfully create a new file", async () => {
          const data: FileBuildData = {
            stream: createReadStream(
              "src/testing/assets/viral-culture-per-ct-value.jpg"
            ),
            mimetype: MimeTypeEnum.JPEG,
          };

          const file = await File.build(data);

          expect(file).toBeDefined();

          const digitalOcean = await getFile(file._id.toString());

          expect(digitalOcean.ContentType).toBe(data.mimetype);
          expect(digitalOcean.Body).toBeDefined();
        });
      });
    });
  });
});

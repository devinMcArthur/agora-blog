import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { ParagraphEditProposal } from "@models";
import {
  EditProposalChangeTypes,
  IParagraphEditProposalBuildData,
} from "@typescript/models/ParagraphEditProposal";
import _ids from "@testing/_ids";
import { StyleTypes, StyleVariants } from "@typescript/models/Statement";

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

describe("Paragraph Class", () => {
  describe("GET", () => {
    describe("getEditProposals", () => {
      describe("success", () => {
        test("should successfully get all edit proposals", async () => {
          const editProposals =
            await documents.paragraphs.page_covid_2019_paragraph_v1.getEditProposals();

          expect(editProposals.length).toBe(1);

          expect(editProposals[0]._id.toString()).toBe(
            documents.paragraphEditProposals.page_covid_2019_paragraph_v1_proposal_1._id.toString()
          );
        });
      });
    });
  });
});

import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { User, UserVerificationRequest } from "@models";
import _ids from "@testing/_ids";
import { IUserData } from "@typescript/models/User";
import { compare } from "bcryptjs";
import { rejects } from "assert";

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

describe("User Verification Request Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should successfully create a new user verification request", async () => {
          const userVerificationRequest = await UserVerificationRequest.build(
            documents.users.nonVerified
          );

          await userVerificationRequest.save();

          expect(userVerificationRequest.user!.toString()).toBe(
            documents.users.nonVerified._id.toString()
          );
        });
      });

      describe("error", () => {
        test("should error if user is already verified", async () => {
          expect.assertions(1);

          try {
            await UserVerificationRequest.build(documents.users.dev);
          } catch (e: any) {
            expect(e.message).toBe("this user is already verified");
          }
        });

        test("should error if user already has a verification request", async () => {
          expect.assertions(1);

          try {
            await UserVerificationRequest.build(
              documents.users.verificationRequested
            );
          } catch (e: any) {
            expect(e.message).toBe(
              "this user has already requested verification"
            );
          }
        });
      });
    });
  });
});

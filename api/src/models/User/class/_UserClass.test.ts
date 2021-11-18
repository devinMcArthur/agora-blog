import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { User } from "@models";
import _ids from "@testing/_ids";
import { IUserData } from "@typescript/models/User";
import { compare } from "bcryptjs";

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

describe("User Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should successfully create a new user document", async () => {
          const data: IUserData = {
            firstName: "first",
            middleName: "middle",
            lastName: "last",
            email: "test@email.com",
            password: "123456",
          };

          const user = await User.build(data);

          await user.save();

          const fetchedUser = await User.getById(user._id);

          expect(fetchedUser).toBeDefined();
          expect(
            await compare(data.password, fetchedUser!.password)
          ).toBeTruthy();
        });
      });

      describe("error", () => {
        test("should error if email is already taken", async () => {
          expect.assertions(1);

          try {
            await User.build({
              firstName: "first",
              lastName: "last",
              email: documents.users.dev.email,
              password: "password",
            });
          } catch (e: any) {
            expect(e.message).toBe(
              "user.validateDocument: user with this email already exists"
            );
          }
        });
      });
    });
  });

  describe("UPDATE", () => {
    describe("requestVerification", () => {
      describe("success", () => {
        test("should successfully request verification", async () => {
          const request =
            await documents.users.nonVerified.requestVerification();

          expect(request.user!.toString()).toBe(
            documents.users.nonVerified._id.toString()
          );
        });
      });
    });
  });
});

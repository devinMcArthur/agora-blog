import request from "supertest";
import jwt from "jsonwebtoken";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import jestLogin from "@testing/jestLogin";
import {
  CreateUserData,
  UpdateUserData,
} from "@graphql/resolvers/user/mutations";
import { User, UserVerificationRequest } from "@models";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

let mongoServer: any, documents: SeededDatabase, app: any;
function setupDatabase() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

beforeAll(async (done) => {
  mongoServer = await prepareDatabase();

  app = await createApp();

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("User Resolver", () => {
  describe("QUERIES", () => {
    describe("currentUser", () => {
      const currentUser = `
        query CurrentUser {
          currentUser {
            firstName
          }
        }
      `;

      describe("success", () => {
        test("should successfully return logged in user", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          const res = await request(app)
            .post("/graphql")
            .send({
              query: currentUser,
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.currentUser.firstName).toBe(
            documents.users.dev.firstName
          );
        });
      });
    });
  });

  describe("MUTATIONS", () => {
    describe("createUser", () => {
      const createUser = `
        mutation CreateUser($data: CreateUserData!) {
          createUser(data: $data)
        }
      `;

      describe("success", () => {
        test("should successfully create user and get valid token back", async () => {
          const data: CreateUserData = {
            firstName: "firstName",
            lastName: "last",
            email: "new@email.com",
            password: "password",
            bio: "bio",
          };

          const res = await request(app).post("/graphql").send({
            query: createUser,
            variables: {
              data,
            },
          });

          expect(res.status).toBe(200);

          const token = res.body.data.createUser;

          expect(token).toBeDefined();

          const authorizedRes = await request(app)
            .post("/graphql")
            .send({
              query: `
              query CurrentUser {
                currentUser {
                  firstName
                  bio
                }
              }
            `,
            })
            .set("Authorization", token);

          expect(authorizedRes.status).toBe(200);

          expect(authorizedRes.body.data.currentUser.firstName).toBe(
            data.firstName
          );
          expect(authorizedRes.body.data.currentUser.bio).toBe(data.bio);
        });
      });
    });

    describe("updateUser", () => {
      const updateUserMutation = `
        mutation UpdateUser($userId: String!, $data: UpdateUserData!) {
          updateUser(userId: $userId, data: $data) {
            bio
          }
        }
      `;

      describe("success", () => {
        test("should successfully update user bio", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          const data: UpdateUserData = {
            bio: "New Bio",
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: updateUserMutation,
              variables: {
                userId: documents.users.dev._id,
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          const newUser = res.body.data.updateUser;

          expect(newUser.bio).toBe(data.bio);

          const fetchedUser = await User.getById(documents.users.dev._id);

          expect(fetchedUser!.bio).toBe(data.bio);
        });
      });
    });

    describe("login", () => {
      const login = `
        mutation Login($data: LoginData!) {
          login(data: $data) 
        }
      `;

      describe("success", () => {
        test("should successfully search pages", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: login,
              variables: {
                data: {
                  email: documents.users.dev.email,
                  password: "password",
                },
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.login).toBeDefined();

          const decoded: any = jwt.decode(res.body.data.login);
          expect(decoded).toBeDefined();

          expect(decoded!.userId).toBe(documents.users.dev._id.toString());
        });
      });
    });

    describe("requestVerification", () => {
      const requestVerificationMutation = `
        mutation RequestVerification {
          requestVerification {
            verificationRequested {
              _id
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully request verification", async () => {
          const token = await jestLogin(app, documents.users.nonVerified.email);

          const res = await request(app)
            .post("/graphql")
            .send({
              query: requestVerificationMutation,
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(
            res.body.data.requestVerification.verificationRequested
          ).toBeDefined();

          const verificationRequest = await UserVerificationRequest.getById(
            res.body.data.requestVerification.verificationRequested._id
          );
          expect(verificationRequest).toBeDefined();
        });
      });
    });
  });
});

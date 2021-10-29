import request from "supertest";
import jwt from "jsonwebtoken";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import jestLogin from "@testing/jestLogin";

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
  });
});
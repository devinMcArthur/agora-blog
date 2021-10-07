import request from "supertest";
import { createTestClient } from "apollo-server-testing";

import app from "../../app";
import { prepareDatabase, disconnectAndStopServer } from "../../testing/jestDB";
import seedDatabase from "../../testing/seedDatabase";
import { apolloServer } from "../../server";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import PageResolver from "../resolvers/page";
import VariableResolver from "../resolvers/variable";
import QuestionResolver from "../resolvers/question";
import ParagraphResolver from "../resolvers/paragraph";
import StatementResolver from "../resolvers/statement";
import StatementValueResolver from "../resolvers/statementValue";
import VariableVersionResolver from "../resolvers/variableVersion";
import StatementSourcesResolver from "../resolvers/statementSources";
import StatementVersionResolver from "../resolvers/statementVersion";
import VariableEquationResolver from "../resolvers/variableEquation";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

let mongoServer: any, documents: any, testClient: any;
function setupDatabase() {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // documents = await seedDatabase();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

beforeAll(async (done) => {
  mongoServer = await prepareDatabase();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PageResolver,
        ParagraphResolver,
        VariableResolver,
        QuestionResolver,
        VariableResolver,
        StatementResolver,
        StatementValueResolver,
        VariableVersionResolver,
        VariableEquationResolver,
        StatementSourcesResolver,
        StatementVersionResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }: { req: any; res: any }) => ({
      // redis,
      req,
      res,
    }),
  });

  testClient = createTestClient(apolloServer);

  await setupDatabase();

  done();
});

afterAll(async (done) => {
  await disconnectAndStopServer(mongoServer);
  done();
});

describe("Page Schema", () => {
  describe("queries", () => {
    describe("page", () => {
      test("should get page object", async (done) => {
        const res = await request(app).post("/graphql");

        console.log(res);

        done();
      });
    });
  });
});

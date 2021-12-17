import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import jestLogin from "@testing/jestLogin";
import { NewVariableEditProposalData } from "@graphql/resolvers/variableEditProposal/mutations";
import { VariableVersionTypes } from "@typescript/models/Variable";

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

describe("Variable Edit Proposal Resolver", () => {
  describe("MUTATIONS", () => {
    describe("newVariableEditProposal", () => {
      const newVariableEditProposalMutation = `
        mutation NewVariableEditProposal($data: NewVariableEditProposalData!) {
          newVariableEditProposal(data: $data) {
            _id
            variable {
              _id
              title
            }
            variableVersionIndex
            description
            author {
              firstName
            }
            finalValue
            value {
              sourceUrl
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a new variable edit proposal", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          const data: NewVariableEditProposalData = {
            description: "new",
            value: {
              type: VariableVersionTypes.number,
              number: 12,
              sourceUrl: "valid.com",
            },
            variable:
              documents.variables.var_global_cases_covid_19._id.toString(),
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: newVariableEditProposalMutation,
              variables: {
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.newVariableEditProposal).toBeDefined();

          const newVariableEditProposal = res.body.data.newVariableEditProposal;

          expect(newVariableEditProposal.description).toBe(data.description);
          expect(newVariableEditProposal.finalValue).toBe(12);
          expect(newVariableEditProposal.author.firstName).toBe(
            documents.users.dev.firstName
          );
          expect(newVariableEditProposal.variable.title).toBe(
            documents.variables.var_global_cases_covid_19.title
          );
        });
      });

      describe("error", () => {
        test("should error if not logged in", async () => {
          const data: NewVariableEditProposalData = {
            description: "new",
            value: {
              type: VariableVersionTypes.number,
              number: 12,
              sourceUrl: "valid.com",
            },
            variable:
              documents.variables.var_global_cases_covid_19._id.toString(),
          };

          const res = await request(app).post("/graphql").send({
            query: newVariableEditProposalMutation,
            variables: {
              data,
            },
          });

          expect(res.status).toBe(200);

          expect(res.body.errors[0].message).toMatch("Access denied!");
        });
      });
    });

    describe("approveVariableEditProposal", () => {});
  });
});

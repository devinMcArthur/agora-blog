import request from "supertest";

import { prepareDatabase, disconnectAndStopServer } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";

import createApp from "../../app";
import jestLogin from "@testing/jestLogin";
import {
  VariableEquationTypes,
  VariableOperatorTypes,
  VariableVersionTypes,
} from "@typescript/models/Variable";
import { NewVariableData } from "@graphql/resolvers/variable/mutations";
import { Variable } from "@models";

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

describe("Variable Resolver", () => {
  describe("MUTATIONS", () => {
    describe("newVariable", () => {
      const newVariableMutation = `
        mutation NewVariable($data: NewVariableData!) {
          newVariable(data: $data) {
            _id
            title
            finalValue
            originalAuthor {
              firstName
            }
            versions {
              type
              number
              equation {
                type
                number
                variable {
                  _id
                  finalValue
                }
                operator
              }
            }
          }
        }
      `;

      describe("success", () => {
        test("should successfully create a new number variable", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          const data: NewVariableData = {
            title: "New Number Variable",
            version: {
              type: VariableVersionTypes.number,
              number: 42,
            },
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: newVariableMutation,
              variables: {
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.newVariable).toBeDefined();

          const newVariable = res.body.data.newVariable;

          expect(newVariable.title).toBe(data.title);
          expect(newVariable.originalAuthor.firstName).toBe(
            documents.users.dev.firstName
          );

          expect(newVariable.versions.length).toBe(1);
          expect(newVariable.versions[0].number).toBe(data.version.number);
        });

        test("should successfully create a new equation variable", async () => {
          const token = await jestLogin(app, documents.users.dev.email);

          const data: NewVariableData = {
            title: "New Equation Variable",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.OpenBracket,
                },
                {
                  type: VariableEquationTypes.variable,
                  variable:
                    documents.variables.var_global_deaths_covid_19._id.toString(),
                },
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.Divide,
                },
                {
                  type: VariableEquationTypes.variable,
                  variable:
                    documents.variables.var_global_cases_covid_19._id.toString(),
                },
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.CloseBracket,
                },
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.Multiply,
                },
                {
                  type: VariableEquationTypes.number,
                  number: 100,
                },
              ],
            },
          };

          const res = await request(app)
            .post("/graphql")
            .send({
              query: newVariableMutation,
              variables: {
                data,
              },
            })
            .set("Authorization", token);

          expect(res.status).toBe(200);

          expect(res.body.data.newVariable).toBeDefined();

          const newVariable = res.body.data.newVariable;

          expect(newVariable.title).toBe(data.title);
          expect(newVariable.originalAuthor.firstName).toBe(
            documents.users.dev.firstName
          );

          expect(newVariable.versions.length).toBe(1);
          expect(newVariable.versions[0].equation.length).toBe(
            data.version.equation?.length
          );

          const variable = await Variable.getById(newVariable._id);
          expect(variable).toBeDefined();

          expect(newVariable.finalValue).toBe(await variable?.getFinalValue());
        });
      });

      describe("error", () => {
        test("should error if not logged in", async () => {
          const data: NewVariableData = {
            title: "New Number Variable",
            version: {
              type: VariableVersionTypes.number,
              number: 42,
            },
          };

          const res = await request(app).post("/graphql").send({
            query: newVariableMutation,
            variables: {
              data,
            },
          });

          expect(res.status).toBe(200);

          expect(res.body.errors[0].message).toMatch("Access denied!");
        });
      });
    });
  });

  describe("QUERIES", () => {
    describe("searchVariables", () => {
      const searchVariablesQuery = `
        query SearchVariables($searchString: String!) {
          searchVariables(searchString: $searchString) {
            title
          }
        }
      `;

      describe("success", () => {
        test.skip("should successfully search variables", async () => {
          const res = await request(app)
            .post("/graphql")
            .send({
              query: searchVariablesQuery,
              variables: {
                searchString: "deat",
              },
            });

          expect(res.status).toBe(200);

          expect(res.body.data.searchVariables[0].title).toBe(
            documents.variables.var_global_deaths_covid_19.title
          );
        });
      });
    });
  });
});

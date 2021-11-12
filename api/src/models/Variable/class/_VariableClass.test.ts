import { Types } from "mongoose";
import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { Variable } from "@models";
import {
  IVariableBuildData,
  VariableEquationTypes,
  VariableOperatorTypes,
  VariableVersionTypes,
} from "@typescript/models/Variable";

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

describe("Variable Class", () => {
  describe("GET", () => {
    describe("search", () => {
      describe("success", () => {
        test("should successfully search database w/ lowercase", async () => {
          const results = await Variable.search("deat");

          expect(results.length).toBe(1);
        });
      });
    });
  });

  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should successfully build a new number variable", async () => {
          const data: IVariableBuildData = {
            title: "test",
            version: {
              type: VariableVersionTypes.number,
              number: 42,
              sourceUrl: "www.google.ca",
            },
            author: documents.users.dev._id,
          };

          const variable = await Variable.build(data);

          expect(variable).toBeDefined();

          expect(variable.versions.length).toBe(1);

          expect(variable.versions[0].type).toBe(data.version.type);
          expect(variable.versions[0].number).toBe(data.version.number);
          expect(variable.versions[0].sourceUrl).toBe(data.version.sourceUrl);
        });

        test("should successfully build a new equation variable", async () => {
          const data: IVariableBuildData = {
            title: "case fatality rate",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.OpenBracket,
                },
                {
                  type: VariableEquationTypes.variable,
                  variable: documents.variables.var_global_deaths_covid_19._id,
                },
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.Divide,
                },
                {
                  type: VariableEquationTypes.variable,
                  variable: documents.variables.var_global_cases_covid_19._id,
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
            author: documents.users.dev._id,
          };

          const variable = await Variable.build(data);

          expect(variable).toBeDefined();

          expect(variable.title).toBe(data.title);

          expect(variable.versions.length).toBe(1);
          expect(variable.versions[0].sourceUrl).toBeUndefined();

          const finalValue = await variable.getFinalValue();

          expect(finalValue).toBe(
            eval(
              `(${await documents.variables.var_global_deaths_covid_19.getFinalValue()}/${await documents.variables.var_global_cases_covid_19.getFinalValue()})*100`
            )
          );
        });
      });

      describe("error", () => {
        test("should error if no title is provided", async () => {
          // @ts-expect-error
          const data: IVariableBuildData = {};

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a title");
          }
        });

        test("should error if duplicate title is provided", async () => {
          // @ts-expect-error
          const data: IVariableBuildData = {
            title:
              documents.variables.var_covid_19_rt_pcr_test_false_negative_rate
                .title,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("a variable already exists with this title");
          }
        });

        test("should error if source url is invalid", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              sourceUrl: "invalid",
              type: VariableVersionTypes.number,
              number: 12,
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a valid source url");
          }
        });

        test("should error if no number is provided", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.number,
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a valid number");
          }
        });

        test("should error if no equation is provided", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide an equation object");
          }
        });

        test("should error if no equation item does not container variable", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.variable,
                },
              ],
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a variable reference");
          }
        });

        test("should error if equation item variable id is invalid", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.variable,
                  variable: Types.ObjectId(),
                },
              ],
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("unable to find referenced variable");
          }
        });

        test("should error if equation item variable is not a number", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.variable,
                  variable:
                    documents.variables
                      .var_covid_19_rt_pcr_test_false_negative_rate._id,
                },
              ],
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe(
              "can only reference variables that have type 'number'"
            );
          }
        });

        test("should error if equation item does not include a number", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.number,
                },
              ],
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a valid number");
          }
        });

        test("should error if trying to save an equation item that has an invalid operator", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.operator,
                  // @ts-expect-error
                  operator: "$",
                },
              ],
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("this equation is invalid");
          }
        });

        test("should error if equation does not equate to a value", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.equation,
              equation: [
                {
                  type: VariableEquationTypes.number,
                  number: 42,
                },
                {
                  type: VariableEquationTypes.operator,
                  operator: VariableOperatorTypes.Exponential,
                },
              ],
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await Variable.build(data);
          } catch (e: any) {
            expect(e.message).toBe("this equation is invalid");
          }
        });

        test("should error if author is invalid", async () => {
          const data: IVariableBuildData = {
            title: "unique",
            version: {
              type: VariableVersionTypes.number,
              number: 17,
            },
            author: Types.ObjectId(),
          };
        });
      });
    });
  });
});

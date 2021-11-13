import { Types } from "mongoose";
import MongoMemoryServer from "mongodb-memory-server-core";

import { disconnectAndStopServer, prepareDatabase } from "@testing/jestDB";
import seedDatabase, { SeededDatabase } from "@testing/seedDatabase";
import { VariableEditProposal } from "@models";
import {
  VariableEquationTypes,
  VariableOperatorTypes,
  VariableVersionTypes,
} from "@typescript/models/Variable";
import _ids from "@testing/_ids";
import { IVariableEditProposalData } from "@typescript/models/VariableEditProposal";

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

describe("Variable Edit Proposal Class", () => {
  describe("BUILD", () => {
    describe("build", () => {
      describe("success", () => {
        test("should successfully build a new number variable edit proposal", async () => {
          const data: IVariableEditProposalData = {
            variable: _ids.variables.var_global_deaths_covid_19._id,
            description: "description",
            value: {
              type: VariableVersionTypes.number,
              number: 42,
              sourceUrl: "www.google.ca",
            },
            author: documents.users.dev._id,
          };

          const variableEditProposal = await VariableEditProposal.build(data);

          expect(variableEditProposal).toBeDefined();

          expect(variableEditProposal.description).toBe(data.description);

          expect(variableEditProposal.variableVersionIndex).toBe(
            documents.variables.var_global_deaths_covid_19.versions.length - 1
          );

          expect(variableEditProposal.value.type).toBe(data.value.type);
          expect(variableEditProposal.value.number).toBe(data.value.number);
          expect(variableEditProposal.value.sourceUrl).toBe(
            data.value.sourceUrl
          );
        });

        test("should successfully build a new equation variable", async () => {
          const data: IVariableEditProposalData = {
            variable: documents.variables.var_global_cases_covid_19._id,
            description: "description",
            value: {
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

          const variableEditProposal = await VariableEditProposal.build(data);

          expect(variableEditProposal).toBeDefined();

          expect(variableEditProposal.variableVersionIndex).toBe(
            documents.variables.var_global_cases_covid_19.versions.length - 1
          );
        });
      });

      describe("error", () => {
        test("should error if variable id is invalid", async () => {
          // @ts-expect-error
          const data: IVariableEditProposalData = {
            author: documents.users.dev._id,
            variable: Types.ObjectId(),
          };

          expect.assertions(1);

          try {
            await VariableEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe("could not find variable");
          }
        });

        test("should error if author id is invalid", async () => {
          // @ts-expect-error
          const data: IVariableEditProposalData = {
            author: Types.ObjectId(),
            variable:
              documents.variables.var_covid_19_rt_pcr_test_false_negative_rate
                ._id,
          };

          expect.assertions(1);

          try {
            await VariableEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe("unable to find author");
          }
        });

        test("should error if source url is invalid", async () => {
          const data: IVariableEditProposalData = {
            variable:
              documents.variables.var_covid_19_rt_pcr_test_false_negative_rate
                ._id,
            description: "description",
            value: {
              sourceUrl: "invalid",
              type: VariableVersionTypes.number,
              number: 12,
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await VariableEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a valid source url");
          }
        });

        test("should error if no value is provided", async () => {
          // @ts-expect-error
          const data: IVariableEditProposalData = {
            variable:
              documents.variables.var_covid_19_rt_pcr_test_false_negative_rate
                ._id,
            author: documents.users.dev._id,
            description: "desc",
          };

          expect.assertions(1);

          try {
            await VariableEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a value for this version");
          }
        });

        test("should error if no description is provided", async () => {
          const data: IVariableEditProposalData = {
            variable:
              documents.variables.var_covid_19_rt_pcr_test_false_negative_rate
                ._id,
            description: "",
            value: {
              sourceUrl: "valid.com",
              type: VariableVersionTypes.number,
              number: 12,
            },
            author: documents.users.dev._id,
          };

          expect.assertions(1);

          try {
            await VariableEditProposal.build(data);
          } catch (e: any) {
            expect(e.message).toBe("must provide a description");
          }
        });
      });
    });
  });

  describe("INTERACT", () => {
    describe("approve", () => {
      describe("success", () => {
        test("should successfully approve a valid edit proposal", async () => {
          const variableEditProposal =
            documents.variableEditProposals
              .var_covid_19_rt_pcr_test_sensitivity_v2;
          const variable =
            documents.variables.var_covid_19_rt_pcr_test_sensitivity;

          expect(variable.versions.length).toBe(1);

          const updatedVariable = await variableEditProposal.approve();

          expect(updatedVariable.versions.length).toBe(2);
          expect(
            updatedVariable.versions[1].sourceEditProposal!.toString()
          ).toBe(variableEditProposal._id.toString());

          expect(updatedVariable.versions[1].type).toBe(
            variableEditProposal.value.type
          );
          expect(updatedVariable.versions[1].number).toBe(
            variableEditProposal.value.number
          );
          expect(updatedVariable.versions[1].sourceUrl).toBe(
            variableEditProposal.value.sourceUrl
          );
        });
      });

      describe("error", () => {
        test("should error if trying to approve an outdated proposal", async () => {
          expect.assertions(1);

          try {
            await documents.variableEditProposals.var_global_cases_covid_19_v2.approve();
          } catch (e: any) {
            expect(e.message).toBe("this edit proposal is outdated");
          }
        });
      });
    });
  });
});

import {
  Variable,
  VariableEditProposalDocument,
  VariableEditProposalModel,
} from "@models";
import { IVariableEditProposalData } from "@typescript/models/VariableEditProposal";

const build = (
  VariableEditProposal: VariableEditProposalModel,
  data: IVariableEditProposalData
) => {
  return new Promise<VariableEditProposalDocument>(async (resolve, reject) => {
    try {
      const referencedVariable = await Variable.getById(data.variable);
      if (!referencedVariable) throw new Error("could not find variable");

      const variableEditProposal = new VariableEditProposal({
        ...data,
        variableVersionIndex: referencedVariable.versions.length - 1,
      });

      await variableEditProposal.validateDocument();

      resolve(variableEditProposal);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};

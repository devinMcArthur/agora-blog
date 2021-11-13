import {
  Variable,
  VariableDocument,
  VariableEditProposalDocument,
} from "@models";

const approve = (variableEditProposal: VariableEditProposalDocument) => {
  return new Promise<VariableDocument>(async (resolve, reject) => {
    try {
      const variable = await Variable.getById(
        variableEditProposal.variable!.toString()
      );
      if (!variable) throw new Error("unable to find variable");

      await variable.updateFromProposal(variableEditProposal);

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  approve,
};

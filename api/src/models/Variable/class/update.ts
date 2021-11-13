import { VariableDocument, VariableEditProposalDocument } from "@models";

const fromProposal = (
  variable: VariableDocument,
  variableEditProposal: VariableEditProposalDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (
        variable.versions.length - 1 !==
        variableEditProposal.variableVersionIndex
      )
        throw new Error("this edit proposal is outdated");

      variable.versions.push({
        ...JSON.parse(JSON.stringify(variableEditProposal.value)),
        sourceEditProposal: variableEditProposal._id,
      });

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fromProposal,
};

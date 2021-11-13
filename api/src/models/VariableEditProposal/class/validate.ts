import { User, Variable, VariableEditProposalDocument } from "@models";
import validateVariableVersion from "@validation/validateVariableVersion";

const document = (variableEditProposal: VariableEditProposalDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const variable = await Variable.getById(
        variableEditProposal.variable!.toString()
      );
      if (!variable) throw new Error("unable to find referenced variable");

      if (!variable.versions[variableEditProposal.variableVersionIndex])
        throw new Error("invalid variable version index");

      const author = await User.getById(
        variableEditProposal.author!.toString()
      );
      if (!author) throw new Error("unable to find author");

      if (!variableEditProposal.description)
        throw new Error("must provide a description");

      await validateVariableVersion(variableEditProposal.value);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

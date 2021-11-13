import { Types } from "mongoose";
import {
  User,
  UserDocument,
  Variable,
  VariableDocument,
  VariableEditProposalDocument,
  VariableEditProposalModel,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";
import getVariableVersionValue from "@utils/getVariableVersionValue";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  VariableEditProposal: VariableEditProposalModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<VariableEditProposalDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const variable = await VariableEditProposal.findById(id);

      if (!variable && options.throwError) {
        throw new Error(
          "VariableEditProposal.getById: Unable to find variable edit proposal"
        );
      }

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

const finalValue = (variableEditProposal: VariableEditProposalDocument) => {
  return new Promise<number>(async (resolve, reject) => {
    try {
      resolve(await getVariableVersionValue(variableEditProposal.value));
    } catch (e) {
      reject(e);
    }
  });
};

const author = (variableEditProposal: VariableEditProposalDocument) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const author = await User.getById(
        variableEditProposal.author!.toString()
      );
      if (!author) throw new Error("unable to find author");

      resolve(author);
    } catch (e) {
      reject(e);
    }
  });
};

const variable = (variableEditProposal: VariableEditProposalDocument) => {
  return new Promise<VariableDocument>(async (resolve, reject) => {
    try {
      const variable = await Variable.getById(
        variableEditProposal.variable!.toString()
      );
      if (!variable) throw new Error("unable to find variable");

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  finalValue,
  author,
  variable,
};

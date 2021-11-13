import { Types } from "mongoose";
import {
  VariableEditProposalDocument,
  VariableEditProposalModel,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";

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

export default {
  byId,
};

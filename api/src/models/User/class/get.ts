import { Types } from "mongoose";
import {
  Page,
  PageDocument,
  ParagraphEditProposal,
  ParagraphEditProposalDocument,
  UserDocument,
  UserModel,
  Variable,
  VariableDocument,
  VariableEditProposal,
  VariableEditProposalDocument,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  User: UserModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      const user = await User.findById(id);

      if (!user && options.throwError)
        throw new Error("User.getById: unable to find a user with that Id");

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const byEmailDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byEmail = (
  User: UserModel,
  email: string,
  options: GetByIDOptions = byEmailDefaultOptions
) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byEmailDefaultOptions);

      const user = await User.findOne({ email });
      if (!user && options.throwError)
        throw new Error(
          "User.getByEmail: unable to find a user with that email"
        );

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const authoredPages = (user: UserDocument) => {
  return new Promise<PageDocument[]>(async (resolve, reject) => {
    try {
      const pages = await Page.find({ originalAuthor: user._id });

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const authoredParagraphEditProposals = (user: UserDocument) => {
  return new Promise<ParagraphEditProposalDocument[]>(
    async (resolve, reject) => {
      try {
        const paragraphEditProposals = ParagraphEditProposal.find({
          author: user._id,
        });

        resolve(paragraphEditProposals);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const authoredVariables = (user: UserDocument) => {
  return new Promise<VariableDocument[]>(async (resolve, reject) => {
    try {
      const variables = await Variable.find({ originalAuthor: user._id });

      resolve(variables);
    } catch (e) {
      reject(e);
    }
  });
};

const authoredVariableEditProposals = (user: UserDocument) => {
  return new Promise<VariableEditProposalDocument[]>(
    async (resolve, reject) => {
      try {
        const variableEditProposals = await VariableEditProposal.find({
          author: user._id,
        });

        resolve(variableEditProposals);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  byId,
  byEmail,
  authoredPages,
  authoredParagraphEditProposals,
  authoredVariables,
  authoredVariableEditProposals,
};

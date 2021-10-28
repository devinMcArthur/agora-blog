import { Types } from "mongoose";
import {
  Paragraph,
  ParagraphDocument,
  ParagraphEditProposalDocument,
  ParagraphEditProposalModel,
  User,
  UserClass,
  UserDocument,
} from "@models";
import GetByIDOptions from "@typescript/interface/getByID_Options";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  ParagraphEditProposal: ParagraphEditProposalModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
) => {
  return new Promise<ParagraphEditProposalDocument | null>(
    async (resolve, reject) => {
      try {
        const paragraphEditProposal = await ParagraphEditProposal.findById(id);

        if (!paragraphEditProposal && options.throwError)
          throw new Error(
            "ParagraphEditProposal.getById: unable to find a paragraph edit proposal with that Id"
          );

        resolve(paragraphEditProposal);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byParagraph = (
  ParagraphEditProposal: ParagraphEditProposalModel,
  paragraph: ParagraphDocument
) => {
  return new Promise<ParagraphEditProposalDocument[]>(
    async (resolve, reject) => {
      try {
        const paragraphEditProposals = await ParagraphEditProposal.find({
          paragraph: paragraph._id,
        });

        resolve(paragraphEditProposals);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const author = (paragraphEditProposal: ParagraphEditProposalDocument) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const user = await User.getById(paragraphEditProposal.author!.toString());
      if (!user)
        throw new Error(
          "paragraphEditProposal.getAuthor: invalid edit proposal, no author was found, please contact support"
        );

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const paragraph = (paragraphEditProposal: ParagraphEditProposalDocument) => {
  return new Promise<ParagraphDocument>(async (resolve, reject) => {
    try {
      const paragraph = await Paragraph.getById(
        paragraphEditProposal.paragraph!.toString()
      );
      if (!paragraph)
        throw new Error(
          "paragraphEditProposal.getParagraph: invalid edit proposal, no paragraph was found, please contact support"
        );

      resolve(paragraph);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byParagraph,
  author,
  paragraph,
};

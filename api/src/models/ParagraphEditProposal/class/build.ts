import {
  ParagraphEditProposalDocument,
  ParagraphEditProposalModel,
} from "@models";
import { IParagraphEditProposalBuildData } from "@typescript/models/ParagraphEditProposal";

const build = (
  ParagraphEditProposal: ParagraphEditProposalModel,
  data: IParagraphEditProposalBuildData
) => {
  return new Promise<ParagraphEditProposalDocument>(async (resolve, reject) => {
    try {
      const paragraphEditProposal = new ParagraphEditProposal({
        ...data,
      });

      await paragraphEditProposal.validateDocument();

      resolve(paragraphEditProposal);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};

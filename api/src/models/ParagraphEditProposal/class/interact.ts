import { Paragraph, ParagraphEditProposalDocument } from "@models";
import { IParagraphBuildFromProposalResponse } from "models/Paragraph/class/build";

const approve = (paragraphEditProposal: ParagraphEditProposalDocument) => {
  return new Promise<IParagraphBuildFromProposalResponse>(
    async (resolve, reject) => {
      try {
        resolve(await Paragraph.buildFromProposal(paragraphEditProposal));
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  approve,
};

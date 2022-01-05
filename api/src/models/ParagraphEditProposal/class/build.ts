import {
  ParagraphEditProposalDocument,
  ParagraphEditProposalModel,
} from "@models";
import { IParagraphEditProposalBuildData } from "@typescript/models/ParagraphEditProposal";
import buildStringArray from "@utils/buildStringArray";

const build = (
  ParagraphEditProposal: ParagraphEditProposalModel,
  data: IParagraphEditProposalBuildData
) => {
  return new Promise<ParagraphEditProposalDocument>(async (resolve, reject) => {
    try {
      const statementItems = await Promise.all(
        data.statementItems.map(async (item) => {
          return {
            ...item,
            stringArray: !!item.stringArray
              ? await buildStringArray(item.stringArray)
              : [],
          };
        })
      );

      const paragraphEditProposal = new ParagraphEditProposal({
        ...data,
        statementItems,
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

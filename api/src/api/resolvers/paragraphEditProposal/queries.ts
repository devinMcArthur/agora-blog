import { ParagraphEditProposal } from "@models";

const paragraphEditProposal = (id: string) => {
  return ParagraphEditProposal.getById(id);
};

export default { paragraphEditProposal };

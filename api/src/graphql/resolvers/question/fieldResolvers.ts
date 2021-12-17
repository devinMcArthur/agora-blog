import { QuestionDocument } from "@models";

const referencedCount = async (question: QuestionDocument) => {
  return await question.getReferencedCount();
};

const relatedPages = async (question: QuestionDocument) => {
  return await question.getPagesThatReference();
};

export default { referencedCount, relatedPages };

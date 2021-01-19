import { QuestionDocument } from "src/models/Question";

const referencedCount = async (question: QuestionDocument) => {
  return await question.getReferencedCount({ fromCache: true });
};

const relatedPages = async (question: QuestionDocument) => {
  return await question.getPagesThatReference({ fromCache: true });
};

export default { referencedCount, relatedPages };

import { QuestionDocument } from "src/models/Question";

const referencedCount = async (question: QuestionDocument) => {
  return await question.getReferencedCount({ fromCache: true });
};

const pageConnections = async (question: QuestionDocument) => {
  return await question.getPageConnections({fromCache: true})
}

export default { referencedCount, pageConnections };

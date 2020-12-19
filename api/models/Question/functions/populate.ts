import AgoraTypes from "@devin_mcarthur/agora-types";
import { QuestionDocument } from ".";
import QuestionPageConnection from "../../QuestionPageConnection";

export type QuestionPageConnectionPopulateNormal = () => Promise<AgoraTypes.Question.Documents.QuestionPopulated>;
function normal(question: QuestionDocument) {
  return new Promise(async (resolve, reject) => {
    try {
      const populated: AgoraTypes.Question.Documents.QuestionPopulated = JSON.parse(
        JSON.stringify(question)
      );

      const relatedPages = await QuestionPageConnection.getPagesThatReferenceQuestion(
        question._id
      );

      populated.relatedPages = relatedPages;

      populated.referencedCount = await QuestionPageConnection.getQuestionReferencedCount(
        question._id
      );

      resolve(populated);
    } catch (e) {
      reject(e);
    }
  });
}

export default {
  normal,
};
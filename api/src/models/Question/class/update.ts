import {
  QuestionDocument,
  QuestionModel,
  QuestionPageConnectionDocument,
} from "@models";

const referencedCount = (question: QuestionDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      question.referencedCount = await question.getReferencedCount();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const forQuestionPageConnection = (
  Question: QuestionModel,
  questionPageConnection: QuestionPageConnectionDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const question = await Question.getById(
        questionPageConnection.question!.toString()
      );

      if (question) {
        await question.updateReferencedCount();

        await question.save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  referencedCount,
  forQuestionPageConnection,
};

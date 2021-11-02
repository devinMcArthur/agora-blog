import { QuestionDocument, QuestionModel } from "@models";
import { IQuestionBuildData } from "@typescript/models/Question";

const build = (Question: QuestionModel, data: IQuestionBuildData) => {
  return new Promise<QuestionDocument>(async (resolve, reject) => {
    try {
      const existingQuestion = await Question.getByQuestion(data.question);
      if (existingQuestion) resolve(existingQuestion);

      const question = new Question({
        question: data.question,
      });

      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};

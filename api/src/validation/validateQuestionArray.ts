import { Question, QuestionClass } from "@models";
import { Ref } from "@typegoose/typegoose";

const validateQuestionArray = (questions: Ref<QuestionClass>[]) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        const fetchedQuestion = await Question.getById(question!.toString());
        if (!fetchedQuestion) throw new Error("unable to find question");
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default validateQuestionArray;

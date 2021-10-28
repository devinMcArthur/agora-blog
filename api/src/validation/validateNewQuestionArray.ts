import { Question } from "@models";

const validateNewQuestionArray = (newQuestions: string[]) => {
  return new Promise<void>(async (resolve, reject) => {
    for (let i = 0; i < newQuestions.length; i++) {
      const newQuestion = newQuestions[i];

      try {
        const fetchedQuestion = await Question.findOne({
          question: newQuestion,
        });

        if (fetchedQuestion) throw new Error("this question already exists");
      } catch (e: any) {
        reject(new Error(`newQuestion[${i}] - ${e.message}`));
      }
    }

    resolve();
  });
};

export default validateNewQuestionArray;

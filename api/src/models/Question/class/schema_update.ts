import { QuestionDocument, QuestionModel } from "@models";

const fromV1ToV2 = (question: QuestionDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (question.schemaVersion !== 1)
        throw new Error(`question ${question._id} is not schema version 1`);

      await question.updateReferencedCount();

      question.schemaVersion = 2;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const allFromV1ToV2 = (Question: QuestionModel) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const questions = await Question.find({ schemaVersion: 1 });

      if (questions.length > 0) {
        console.log(
          `Updating ${questions.length} question(s) from version 1 to version 2`
        );

        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];

          await question.updateFromV1ToV2();

          await question.save();
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const fromV2ToV3 = (question: QuestionDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await question.save();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const allFromV2ToV3 = (Question: QuestionModel) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const questions = await Question.find({ schemaVersion: 2 });

      for (let i = 0; i < questions.length; i++) {
        questions[i].schemaVersion = 3;

        await questions[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fromV1ToV2,
  allFromV1ToV2,
  fromV2ToV3,
  allFromV2ToV3,
};

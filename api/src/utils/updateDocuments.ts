import { Page, Question, Variable } from "@models";

const updateSchemas = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await Question.updateAllFromV1ToV2();
      await Question.updateAllFromV2ToV3();

      await Page.updateAllFromV1ToV2();

      /**
       * Save all Documents to ensure all necessary @pre and @post save hooks can run
       */

      // Pages
      const pages = await Page.find();
      for (let i = 0; i < pages.length; i++) {
        await pages[i].save();
      }

      // Questions
      const questions = await Question.find();
      for (let i = 0; i < questions.length; i++) {
        await questions[i].save();
      }

      // Variables
      const variables = await Variable.find();
      for (let i = 0; i < variables.length; i++) {
        await variables[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateSchemas;

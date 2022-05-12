import { logger } from "@logger";
import { Page, Question, Variable } from "@models";
import errorHandler from "@utils/errorHandler";

const saveAll = async () => {
  const pages = await Page.find();
  logger.info(`Saving ${pages.length} page documents`);
  for (let i = 0; i < pages.length; i++) {
    try {
      await pages[i].save();
    } catch (e) {
      errorHandler("Page Save All error", e);
    }
  }

  const questions = await Question.find();
  logger.info(`Saving ${questions.length} question documents`);
  for (let i = 0; i < questions.length; i++) {
    try {
      await questions[i].save();
    } catch (e) {
      errorHandler("Question Save All error", e);
    }
  }

  const variables = await Variable.find();
  logger.info(`Saving ${variables.length} variable documents`);
  for (let i = 0; i < variables.length; i++) {
    try {
      await variables[i].save();
    } catch (e) {
      errorHandler("Variable Save All error", e);
    }
  }

  console.log("Finished saving");
};

export default saveAll;

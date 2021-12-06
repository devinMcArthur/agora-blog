import { Page, Question } from "@models";

const updateSchemas = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await Question.updateAllFromV1ToV2();
      await Question.updateAllFromV2ToV3();

      await Page.updateAllFromV1ToV2();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default updateSchemas;

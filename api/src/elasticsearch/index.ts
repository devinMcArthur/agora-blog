import { ES_ensurePageIndex } from "./helpers/page";
import { ES_ensureQuestionIndex } from "./helpers/question";
import { ES_ensureVariableIndex } from "./helpers/variable";

const elasticsearch = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await ES_ensurePageIndex();

      await ES_ensureQuestionIndex();

      await ES_ensureVariableIndex();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default elasticsearch;

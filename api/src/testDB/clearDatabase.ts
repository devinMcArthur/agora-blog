import Page from "../models/Page";
import Variable from "../models/Variable";
import Question from "../models/Question";
import Paragraph from "../models/Paragraph";
import Statement from "../models/Statement";
import PageConnection from "../models/PageConnection";
import QuestionPageConnection from "../models/QuestionPageConnection";
import VariablePageConnection from "../models/VariablePageConnection";

const clearDatabase = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // if (process.env.NODE_ENV === "test") {
      await Page.deleteMany({});
      await Variable.deleteMany({});
      await Question.deleteMany({});
      await Paragraph.deleteMany({});
      await Statement.deleteMany({});
      await PageConnection.deleteMany({});
      await VariablePageConnection.deleteMany({});
      await QuestionPageConnection.deleteMany({});
      // } else {
      // throw new Error(
      // "clearDatabase: This function can only be used in a test environment"
      // );
      // }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default clearDatabase;

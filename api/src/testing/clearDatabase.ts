import {
  Page,
  Variable,
  Question,
  Paragraph,
  Statement,
  PageConnection,
  QuestionPageConnection,
  VariablePageConnection,
} from "@models";

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

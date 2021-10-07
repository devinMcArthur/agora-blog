import {
  QuestionPageConnection,
  QuestionPageConnectionDocument,
  Statement,
} from "@models";

const createQuestionPageConnections = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const statements = await Statement.find({ current: true });
      let questionPageConnections: QuestionPageConnectionDocument[] = [];

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        let statementsQuestionPageConnections: QuestionPageConnectionDocument[] =
          [];

        // Loop through questions
        for (
          let s = 0;
          s <
          statement.versions[statement.versions.length - 1].questions.length;
          s++
        ) {
          const questionPageConnection = new QuestionPageConnection({
            question:
              statement.versions[statement.versions.length - 1].questions[s],
            referrerPage: statement.page,
            statement: statement._id,
          });
          statementsQuestionPageConnections.push(questionPageConnection);
        }

        questionPageConnections = questionPageConnections.concat(
          statementsQuestionPageConnections
        );
      }

      // Remove any duplicates from connections
      const checkedConnections: QuestionPageConnectionDocument[] = [];
      questionPageConnections = questionPageConnections.filter((object) => {
        if (
          checkedConnections.find(
            (connection) =>
              connection.question!.toString() === object.question!.toString() &&
              connection.referrerPage!.toString() ===
                object.referrerPage!.toString()
          )
        ) {
          // Found a duplicate
          return false;
        }
        // No duplicate found, add to checkedConnections array
        checkedConnections.push(object);
        return true;
      });

      // Save all documents
      for (let i = 0; i < questionPageConnections.length; i++) {
        await questionPageConnections[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default createQuestionPageConnections;

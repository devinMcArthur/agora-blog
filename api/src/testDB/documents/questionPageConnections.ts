import QuestionPageConnection from "../../models/QuestionPageConnection";
import { QuestionPageConnectionDocument } from "../../models/QuestionPageConnection/functions";
import Statement from "../../models/Statement";

const createQuestionPageConnections = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const statements = await Statement.find({ current: true });
      let questionPageConnections: QuestionPageConnectionDocument[] = [];

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        let statementsQuestionPageConnections: QuestionPageConnectionDocument[] = [];

        // Loop through questions
        for (let s = 0; s < statement.questions.length; s++) {
          const questionPageConnection = new QuestionPageConnection({
            questionID: statement.questions[s],
            referrerPageID: statement.pageID,
            statementID: statement._id,
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
              connection.questionID.toString() ===
                object.questionID.toString() &&
              connection.referrerPageID.toString() ===
                object.referrerPageID.toString()
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

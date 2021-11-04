import { QuestionPageConnectionModel, StatementDocument } from "@models";

const forStatement = (
  QuestionPageConnection: QuestionPageConnectionModel,
  statement: StatementDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const referrerPage = statement.page;
      const existingConnections = await QuestionPageConnection.getByStatement(
        statement
      );

      // remove all existing connection if statement is no longer current
      if (statement.current === false) {
        for (let i = 0; i < existingConnections.length; i++) {
          await existingConnections[i].remove();
        }

        resolve();
        return;
      }

      // get all required connections
      const requiredConnections = statement.currentVersion.questions;

      // get all new connections
      const existingConnectionMap = existingConnections.map(
        (questionConnection) => questionConnection.question!.toString()
      );
      const newRequiredConnections = requiredConnections.filter(
        (connection) => {
          if (existingConnectionMap.includes(connection!.toString()))
            return false;
          else return true;
        }
      );

      // create all new connections
      for (let i = 0; i < newRequiredConnections.length; i++) {
        const questionId = newRequiredConnections[i];

        const questionPageConnection = new QuestionPageConnection({
          question: questionId,
          referrerPage,
          statement,
        });

        try {
          await questionPageConnection.save();
        } catch (e) {
          console.error(e);
        }
      }

      // remove all old connections
      const oldConnections = existingConnections.filter(
        (existingConnection) => {
          if (!requiredConnections.includes(existingConnection.question))
            return true;
          else return false;
        }
      );
      for (let i = 0; i < oldConnections.length; i++) {
        if (
          oldConnections[i].referrerPage!.toString() ===
            referrerPage!.toString() &&
          oldConnections[i].statement!.toString() === statement._id.toString()
        ) {
          await oldConnections[i].remove();
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  forStatement,
};

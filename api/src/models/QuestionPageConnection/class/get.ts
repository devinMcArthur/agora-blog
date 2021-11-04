import {
  QuestionPageConnectionDocument,
  QuestionPageConnectionModel,
  StatementDocument,
} from "@models";

const byStatement = (
  QuestionPageConnection: QuestionPageConnectionModel,
  statement: StatementDocument
) => {
  return new Promise<QuestionPageConnectionDocument[]>(
    async (resolve, reject) => {
      try {
        const questionPageConnections = await QuestionPageConnection.find({
          statement: statement._id,
        });

        resolve(questionPageConnections);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default { byStatement };

import { Question, QuestionDocument, StatementVersionDocument } from "@models";

const questions = async (statementVersion: StatementVersionDocument) => {
  const questions: QuestionDocument[] = [];
  for (let i in statementVersion.questions) {
    const question = await Question.getByID(
      statementVersion.questions[i]!.toString(),
      { fromCache: true }
    );
    questions[i] = question!;
  }
  return questions;
};

export default { questions };

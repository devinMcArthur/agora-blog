import { Question, QuestionDocument, StatementVersionDocument } from "@models";

const questions = async (statementVersion: StatementVersionDocument) => {
  const questions: QuestionDocument[] = [];
  for (let i in statementVersion.questions) {
    const question = await Question.getById(
      statementVersion.questions[i]!.toString()
    );
    questions[i] = question!;
  }
  return questions;
};

export default { questions };

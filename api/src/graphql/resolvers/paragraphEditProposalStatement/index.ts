import {
  Statement,
  StatementClass,
  ParagraphEditProposalStatementClass,
  ParagraphEditProposalStatementDocument,
  QuestionClass,
  QuestionDocument,
  Question,
} from "@models";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => ParagraphEditProposalStatementClass)
export default class ParagraphEditProposalStatementResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => [QuestionClass])
  async questions(
    @Root()
    paragraphEditProposalStatement: ParagraphEditProposalStatementDocument
  ) {
    if (
      paragraphEditProposalStatement.questions &&
      paragraphEditProposalStatement.questions.length > 0
    ) {
      const questions: QuestionDocument[] = [];
      for (
        let i = 0;
        i < paragraphEditProposalStatement.questions.length;
        i++
      ) {
        const element = paragraphEditProposalStatement.questions[i];

        const question = await Question.getById(element!.toString());
        if (question) questions.push(question);
      }

      return questions;
    } else {
      return [];
    }
  }

  @FieldResolver(() => StatementClass)
  async quotedStatement(
    @Root()
    paragraphEditProposalStatement: ParagraphEditProposalStatementDocument
  ) {
    if (paragraphEditProposalStatement.quotedStatement)
      return Statement.getById(
        paragraphEditProposalStatement.quotedStatement.toString()
      );
    else return null;
  }
}

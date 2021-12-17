import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  StatementVersionClass,
  StatementVersionDocument,
  QuestionDocument,
  ParagraphEditProposal,
  ParagraphEditProposalClass,
  StatementClass,
  Statement,
} from "@models";

import fieldResolvers from "./fieldResolvers";

@Resolver(() => StatementVersionClass)
export default class StatementVersionResolver {
  @FieldResolver()
  async questions(
    @Root() statementVersion: StatementVersionDocument
  ): Promise<QuestionDocument[] | null> {
    return fieldResolvers.questions(statementVersion);
  }

  @FieldResolver(() => ParagraphEditProposalClass)
  async sourceEditProposal(@Root() statementVersion: StatementVersionDocument) {
    if (statementVersion.sourceEditProposal)
      return ParagraphEditProposal.getById(
        statementVersion.sourceEditProposal.toString()
      );
    else return null;
  }

  @FieldResolver(() => StatementClass, { nullable: true })
  async quotedStatement(@Root() statementVersion: StatementVersionDocument) {
    if (statementVersion.quotedStatement)
      return Statement.getById(statementVersion.quotedStatement.toString());
    else return null;
  }
}

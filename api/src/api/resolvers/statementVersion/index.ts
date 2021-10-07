import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  StatementVersionClass,
  StatementVersionDocument,
  QuestionDocument,
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
}

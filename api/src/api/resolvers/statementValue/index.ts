import { FieldResolver, Resolver, Root } from "type-graphql";

import { StatementDocument } from "../../../models/Statement";
import { PageDocument } from "../../../models/Page";
import {
  StatementValueClass,
  StatementValueDocument,
} from "../../../models/Statement/class";
import { VariableDocument } from "../../../models/Variable";
import fieldResolvers from "./fieldResolvers";

@Resolver(() => StatementValueClass)
export default class StatementValueResolver {
  @FieldResolver()
  async page(
    @Root() statementValue: StatementValueDocument
  ): Promise<PageDocument | null> {
    return fieldResolvers.page(statementValue);
  }

  @FieldResolver()
  async statement(
    @Root() statementValue: StatementValueDocument
  ): Promise<StatementDocument | null> {
    return fieldResolvers.statement(statementValue);
  }

  @FieldResolver()
  async variable(
    @Root() statementValue: StatementValueDocument
  ): Promise<VariableDocument | null> {
    return fieldResolvers.variable(statementValue);
  }
}

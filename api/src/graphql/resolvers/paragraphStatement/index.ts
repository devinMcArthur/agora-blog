import {
  StatementClass,
  ParagraphStatementDocument,
  Statement,
  ParagraphStatementClass,
} from "@models";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => ParagraphStatementClass)
export default class ParagraphStatementResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => StatementClass, { nullable: false })
  async statement(@Root() paragraphStatement: ParagraphStatementDocument) {
    return Statement.getById(paragraphStatement.statement!.toString());
  }
}

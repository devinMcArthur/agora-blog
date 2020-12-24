import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  StatementVersionClass,
  StatementVersionDocument,
} from "../../models/Statement/class";
import Question, { QuestionDocument } from "../../models/Question";

@Resolver(() => StatementVersionClass)
export default class StatementVersionResolver {
  @FieldResolver()
  async questions(
    @Root() statementVersion: StatementVersionDocument
  ): Promise<QuestionDocument[] | null> {
    return await Question.find({
      _id: { $in: statementVersion.questions.map((id) => id!.toString()) },
    });
  }
}

import { FieldResolver, Resolver, Root } from "type-graphql";

import VariableClass, {
  VariableEquationClass,
  VariableEquationDocument,
} from "../../models/Variable/class";
import Variable, { VariableDocument } from "../../models/Variable";

@Resolver(() => VariableEquationClass)
export default class VariableEquationResolver {
  @FieldResolver(() => VariableClass)
  async variable(
    @Root() variableEquation: VariableEquationDocument
  ): Promise<VariableDocument | null> {
    return await Variable.findById(variableEquation.variable);
  }
}

import { FieldResolver, Resolver, Root } from "type-graphql";

import VariableClass, {
  VariableEquationClass,
  VariableEquationDocument,
} from "../../../models/Variable/class";
import { VariableDocument } from "../../../models/Variable";
import fieldResolvers from "./fieldResolvers";

@Resolver(() => VariableEquationClass)
export default class VariableEquationResolver {
  @FieldResolver(() => VariableClass)
  async variable(
    @Root() variableEquation: VariableEquationDocument
  ): Promise<VariableDocument | null> {
    return fieldResolvers.variable(variableEquation);
  }
}

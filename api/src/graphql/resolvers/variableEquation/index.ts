import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  VariableClass,
  VariableEquationClass,
  VariableEquationDocument,
  VariableDocument,
} from "@models";

import fieldResolvers from "./fieldResolvers";

@Resolver(() => VariableEquationClass)
export default class VariableEquationResolver {
  @FieldResolver(() => VariableClass, { nullable: true })
  async variable(
    @Root() variableEquation: VariableEquationDocument
  ): Promise<VariableDocument | null> {
    if (variableEquation.variable)
      return fieldResolvers.variable(variableEquation);
    else return null;
  }
}

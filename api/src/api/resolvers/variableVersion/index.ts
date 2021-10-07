import { FieldResolver, Resolver, Root } from "type-graphql";

import { VariableVersionClass, VariableVersionDocument } from "@models";

import fieldResolvers from "./fieldResolvers";

@Resolver(() => VariableVersionClass)
export default class VariableVersionResolver {
  @FieldResolver(() => Number)
  async finalValue(
    @Root() variableVersion: VariableVersionDocument
  ): Promise<number> {
    return fieldResolvers.finalValue(variableVersion);
  }
}

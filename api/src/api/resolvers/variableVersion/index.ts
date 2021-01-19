import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  VariableVersionClass,
  VariableVersionDocument,
} from "../../../models/Variable/class";
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

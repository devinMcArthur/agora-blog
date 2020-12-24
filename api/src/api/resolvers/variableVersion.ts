import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  VariableVersionClass,
  VariableVersionDocument,
} from "../../models/Variable/class";
import Variable from "../../models/Variable";

@Resolver(() => VariableVersionClass)
export default class VariableVersionResolver {
  @FieldResolver(() => Number)
  async finalValue(
    @Root() variableVersion: VariableVersionDocument
  ): Promise<number> {
    return await Variable.getVersionsFinalValue(variableVersion);
  }
}

import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  VariableEditProposal,
  VariableEditProposalClass,
  VariableVersionClass,
  VariableVersionDocument,
} from "@models";

import fieldResolvers from "./fieldResolvers";

@Resolver(() => VariableVersionClass)
export default class VariableVersionResolver {
  @FieldResolver(() => Number)
  async finalValue(
    @Root() variableVersion: VariableVersionDocument
  ): Promise<number> {
    return fieldResolvers.finalValue(variableVersion);
  }

  @FieldResolver(() => VariableEditProposalClass, { nullable: true })
  async sourceEditProposal(@Root() variableVersion: VariableVersionDocument) {
    if (variableVersion.sourceEditProposal)
      return VariableEditProposal.getById(
        variableVersion.sourceEditProposal!.toString()
      );
    else return null;
  }
}

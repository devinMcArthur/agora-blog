import {
  UserClass,
  VariableClass,
  VariableEditProposalClass,
  VariableEditProposalDocument,
} from "@models";
import { IContext } from "@typescript/graphql";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { NewVariableEditProposalData } from "./mutations";

@Resolver(() => VariableEditProposalClass)
export default class VariableEditProposalResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => UserClass)
  async author(@Root() variableEditProposal: VariableEditProposalDocument) {
    return variableEditProposal.getAuthor();
  }

  @FieldResolver(() => Number)
  async finalValue(@Root() variableEditProposal: VariableEditProposalDocument) {
    return variableEditProposal.getFinalValue();
  }

  @FieldResolver(() => VariableClass)
  async variable(@Root() variableEditProposal: VariableEditProposalDocument) {
    return variableEditProposal.getVariable();
  }

  /**
   * ----- Mutations -----
   */

  @Authorized("VERIFIED")
  @Mutation(() => VariableEditProposalClass)
  async newVariableEditProposal(
    @Arg("data") data: NewVariableEditProposalData,
    @Ctx() ctx: IContext
  ) {
    return mutations.newVariableEditProposal(data, ctx);
  }

  @Authorized("VERIFIED")
  @Mutation(() => VariableClass)
  async approveVariableEditProposal(@Arg("id") id: string) {
    return mutations.approveVariableEditProposal(id);
  }
}

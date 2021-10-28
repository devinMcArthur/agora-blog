import {
  ParagraphClass,
  ParagraphEditProposalClass,
  ParagraphEditProposalDocument,
  UserClass,
} from "@models";
import { IContext } from "@typescript/graphql";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import mutations, { ParagraphEditProposalData } from "./mutations";
import queries from "./queries";

@Resolver(() => ParagraphEditProposalClass)
export default class ParagraphEditProposalResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => UserClass)
  async author(@Root() paragraphEditProposal: ParagraphEditProposalDocument) {
    return paragraphEditProposal.getAuthor();
  }

  @FieldResolver(() => ParagraphClass)
  async paragraph(
    @Root() paragraphEditProposal: ParagraphEditProposalDocument
  ) {
    return paragraphEditProposal.getParagraph();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => ParagraphEditProposalClass)
  async paragraphEditProposal(@Arg("id") id: string) {
    return queries.paragraphEditProposal(id);
  }

  /**
   * ----- Mutations -----
   */

  @Authorized("VERIFIED")
  @Mutation(() => ParagraphEditProposalClass)
  async createParagraphEditProposal(
    @Arg("data") data: ParagraphEditProposalData,
    @Ctx() ctx: IContext
  ) {
    return mutations.createParagraphEditProposal(data, ctx);
  }
}

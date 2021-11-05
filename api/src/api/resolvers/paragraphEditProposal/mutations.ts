import { ParagraphEditProposal, ParagraphEditProposalDocument } from "@models";
import { IContext } from "@typescript/graphql";
import {
  EditProposalChangeTypes,
  IParagraphEditProposalBuildData,
} from "@typescript/models/ParagraphEditProposal";
import { Field, ID, InputType } from "type-graphql";
import { StringArrayData } from "../statement/mutations";
import resolverHelper from "@utils/resolverHelpers";
import { Types } from "mongoose";

@InputType()
export class ParagraphStatementData {
  @Field({ nullable: false })
  public statement!: string;

  @Field({ nullable: false })
  public versionIndex!: number;
}

@InputType()
class ParagraphEditProposalStatementData {
  @Field({ nullable: false })
  public changeType!: EditProposalChangeTypes;

  @Field(() => ParagraphStatementData, { nullable: true })
  public paragraphStatement?: ParagraphStatementData;

  @Field(() => [String], { nullable: true })
  public questions?: string[];

  @Field(() => [String], { nullable: true })
  public newQuestions?: string[];

  @Field(() => ID, { nullable: true })
  public quotedStatement?: string | Types.ObjectId;

  @Field(() => [StringArrayData], { nullable: true })
  public stringArray?: StringArrayData[];
}

@InputType()
export class ParagraphEditProposalData {
  @Field({ nullable: false })
  public paragraph!: string;

  @Field({ nullable: false })
  public description!: string;

  @Field(() => [ParagraphEditProposalStatementData], { nullable: false })
  public statementItems!: ParagraphEditProposalStatementData[];
}

const createParagraphEditProposal = (
  data: ParagraphEditProposalData,
  ctx: IContext
) => {
  return new Promise<ParagraphEditProposalDocument>(async (resolve, reject) => {
    try {
      await resolverHelper.validateVerifiedUser(ctx);

      const statementItems: IParagraphEditProposalBuildData["statementItems"] =
        [];

      for (let i = 0; i < data.statementItems.length; i++) {
        const statementItem = data.statementItems[i];

        let stringArray;
        if (statementItem.stringArray)
          stringArray = await resolverHelper.handleStringArray(
            statementItem.stringArray
          );

        statementItems.push({
          ...statementItem,
          stringArray,
        });
      }

      const paragraphEditProposal = await ParagraphEditProposal.build({
        ...data,
        author: ctx.user!._id,
        statementItems,
      });

      await paragraphEditProposal.save();

      resolve(paragraphEditProposal);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  createParagraphEditProposal,
};

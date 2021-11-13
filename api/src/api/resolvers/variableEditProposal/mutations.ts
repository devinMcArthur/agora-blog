import {
  VariableDocument,
  VariableEditProposal,
  VariableEditProposalDocument,
} from "@models";
import { IContext } from "@typescript/graphql";
import { Field, ID, InputType } from "type-graphql";
import { VariableVersionData } from "../variable/mutations";

@InputType()
export class NewVariableEditProposalData {
  @Field(() => ID, { nullable: false })
  public variable!: string;

  @Field(() => VariableVersionData, { nullable: false })
  public value!: VariableVersionData;

  @Field({ nullable: false })
  public description!: string;
}

const newVariableEditProposal = (
  data: NewVariableEditProposalData,
  ctx: IContext
) => {
  return new Promise<VariableEditProposalDocument>(async (resolve, reject) => {
    try {
      const variableEditProposal = await VariableEditProposal.build({
        ...data,
        author: ctx.user!._id,
      });

      await variableEditProposal.save();

      resolve(variableEditProposal);
    } catch (e) {
      reject(e);
    }
  });
};

const approveVariableEditProposal = (id: string) => {
  return new Promise<VariableDocument>(async (resolve, reject) => {
    try {
      const variableEditProposal = await VariableEditProposal.getById(id);
      if (!variableEditProposal)
        throw new Error("unable to find edit proposal");

      const variable = await variableEditProposal?.approve();

      await variable.save();

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  newVariableEditProposal,
  approveVariableEditProposal,
};

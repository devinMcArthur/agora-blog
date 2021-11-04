import { Page, PageDocument } from "@models";
import { IContext } from "@typescript/graphql";
import { IPageBuildData } from "@typescript/models/Page";
import {
  IStringArrayBuildData,
  IStylesBuildData,
} from "@typescript/models/Statement";
import resolverHelpers from "@utils/resolverHelpers";
import { Field, ID, InputType } from "type-graphql";
import { StringArrayData } from "../statement/mutations";

@InputType()
class NewStatementData {
  @Field(() => [StringArrayData])
  public stringArray!: StringArrayData[];

  @Field(() => [ID], { nullable: false })
  public questions!: string[];

  @Field(() => [String], { nullable: false })
  public newQuestions!: string[];

  @Field(() => ID, { nullable: true })
  public quotedStatement!: string;
}

@InputType()
class NewPageParagraphData {
  @Field(() => [NewStatementData], { nullable: false })
  public statements!: NewStatementData[];
}

@InputType()
export class NewPageData {
  @Field({ nullable: false })
  public title!: string;

  @Field(() => NewPageParagraphData, { nullable: false })
  public paragraph!: NewPageParagraphData;
}

const newPage = (data: NewPageData, ctx: IContext) => {
  return new Promise<PageDocument>(async (resolve, reject) => {
    try {
      const statements: IPageBuildData["paragraph"]["statements"] = [];
      for (let i = 0; i < data.paragraph.statements.length; i++) {
        const dataStatement = data.paragraph.statements[i];

        statements.push({
          ...dataStatement,
          stringArray: await resolverHelpers.handleStringArray(
            dataStatement.stringArray
          ),
        });
      }

      const {
        page,
        paragraph,
        statements: newStatements,
      } = await Page.build({
        author: ctx.user!,
        title: data.title,
        paragraph: {
          statements,
        },
      });

      for (let i = 0; i < newStatements.length; i++)
        await newStatements[i].save();
      await paragraph.save();
      await page.save();

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  newPage,
};

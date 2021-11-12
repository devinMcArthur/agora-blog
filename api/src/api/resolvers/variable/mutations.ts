import { Variable, VariableDocument } from "@models";
import { IContext } from "@typescript/graphql";
import {
  VariableEquationTypes,
  VariableOperatorTypes,
  VariableVersionTypes,
} from "@typescript/models/Variable";
import puppeteer from "puppeteer";
import { Field, ID, InputType } from "type-graphql";

@InputType()
class VariableEquationItemData {
  @Field({ nullable: false })
  public type!: VariableEquationTypes;

  @Field({ nullable: true })
  public operator?: VariableOperatorTypes;

  @Field({ nullable: true })
  public number?: number;

  @Field(() => ID, { nullable: true })
  public variable?: string;
}

@InputType()
class VariableVersionData {
  @Field({ nullable: false })
  public type!: VariableVersionTypes;

  @Field({ nullable: true })
  public sourceUrl?: string;

  @Field({ nullable: true })
  public number?: number;

  @Field(() => [VariableEquationItemData], { nullable: true })
  public equation?: VariableEquationItemData[];
}

@InputType()
export class NewVariableData {
  @Field({ nullable: false })
  public title!: string;

  @Field(() => VariableVersionData, { nullable: false })
  public version!: VariableVersionData;
}

const scrape = (url: string, xPath: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        executablePath: process.env.CHROMIUM_PATH,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url);

      await page.waitForXPath(xPath);
      const [element] = await page.$x(xPath);

      const text = await page.evaluate((el) => {
        return el.textContent;
      }, element);

      console.log(text);

      resolve(text);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

const newVariable = (data: NewVariableData, ctx: IContext) => {
  return new Promise<VariableDocument>(async (resolve, reject) => {
    try {
      if (!ctx.user) throw new Error("must be logged in");

      const variable = await Variable.build({
        ...data,
        author: ctx.user._id,
      });

      await variable.save();

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  scrape,
  newVariable,
};

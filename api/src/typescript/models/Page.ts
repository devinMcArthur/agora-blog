import { UserDocument } from "@models";
import { IParagraphBuildData } from "./Paragraph";

export interface IPageBuildData {
  title: string;
  author: UserDocument;
  paragraph: Pick<IParagraphBuildData, "statements">;
}

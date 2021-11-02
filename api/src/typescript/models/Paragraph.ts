import { PageDocument, UserDocument } from "@models";
import { IStatementBuildData } from "./Statement";

export interface IParagraphBuildData {
  author: UserDocument;
  page: PageDocument;
  statements: IStatementBuildData["version"][];
}

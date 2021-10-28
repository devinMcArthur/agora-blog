import { Page, StatementDocument } from "@models";

const page = async (statement: StatementDocument) => {
  return await Page.getByID(statement.page!.toString());
};

export default { page };

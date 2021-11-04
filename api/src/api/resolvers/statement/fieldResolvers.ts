import { Page, StatementDocument } from "@models";

const page = async (statement: StatementDocument) => {
  return await Page.getById(statement.page!.toString());
};

export default { page };

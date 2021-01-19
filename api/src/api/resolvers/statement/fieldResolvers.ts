import Page from "../../../models/Page";
import { StatementDocument } from "../../../models/Statement";

const page = async (statement: StatementDocument) => {
  return await Page.getByID(statement.page!.toString(), { fromCache: true });
};

export default { page };

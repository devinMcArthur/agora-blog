import Statement from "../../../models/Statement";
import Variable from "../../../models/Variable";
import Page from "../../../models/Page";
import { StatementValueDocument } from "../../../models/Statement/class";

const page = async (statementValue: StatementValueDocument) => {
  if (statementValue.page)
    return await Page.getByID(statementValue.page.toString(), {
      fromCache: true,
    });
  return null;
};

const statement = async (statementValue: StatementValueDocument) => {
  if (statementValue.statement)
    return await Statement.getByID(statementValue.statement.toString(), {
      fromCache: true,
    });
  return null;
};

const variable = async (statementValue: StatementValueDocument) => {
  if (statementValue.variable)
    return await Variable.getByID(statementValue.variable.toString(), {
      fromCache: true,
    });
  return null;
};

export default {
  page,
  statement,
  variable,
};

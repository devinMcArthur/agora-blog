import { Statement, Variable, Page, StatementValueDocument } from "@models";

const page = async (statementValue: StatementValueDocument) => {
  if (statementValue.page)
    return await Page.getByID(statementValue.page.toString());
  return null;
};

const statement = async (statementValue: StatementValueDocument) => {
  if (statementValue.statement)
    return await Statement.getById(statementValue.statement.toString());
  return null;
};

const variable = async (statementValue: StatementValueDocument) => {
  if (statementValue.variable)
    return await Variable.getByID(statementValue.variable.toString());
  return null;
};

export default {
  page,
  statement,
  variable,
};

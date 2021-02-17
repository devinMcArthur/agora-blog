import Page, { PageDocument } from "../../../models/Page";
import Statement from "../../../models/Statement";
import { TopicColumnDocument } from "../../../models/Topic/schema/subDocuments";
import Variable, { VariableDocument } from "../../../models/Variable";

const page = async (topicColumn: TopicColumnDocument) => {
  if (topicColumn.page)
    return await Page.getByID(topicColumn.page!.toString(), {
      fromCache: true,
    });
  else return null;
};

const pages = async (topicColumn: TopicColumnDocument) => {
  const pages: PageDocument[] = [];

  for (let i in topicColumn.pages!) {
    const page = await Page.getByID(topicColumn.pages[i]!.toString(), {
      fromCache: true,
    });
    if (page) pages.push(page);
  }

  return pages;
};

const statement = async (topicColumn: TopicColumnDocument) => {
  if (topicColumn.statement)
    return await Statement.getByID(topicColumn.statement?.toString(), {
      fromCache: true,
    });
  else return null;
};

const variables = async (topicColumn: TopicColumnDocument) => {
  const variables: VariableDocument[] = [];

  for (let i in topicColumn.variables!) {
    const variable = await Variable.getByID(
      topicColumn.variables[i]!.toString(),
      { fromCache: true }
    );
    if (variable) variables.push(variable);
  }

  return variables;
};

export default {
  page,
  pages,
  statement,
  variables,
};

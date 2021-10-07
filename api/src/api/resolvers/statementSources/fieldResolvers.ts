import { Page, PageDocument, StatementSourcesDocument } from "@models";

const pages = async (statementSources: StatementSourcesDocument) => {
  const pages: PageDocument[] = [];
  for (let i = 0; i < statementSources.pages.length; i++) {
    const page = await Page.getByID(statementSources.pages[i]!.toString(), {
      fromCache: true,
    });
    if (page) pages[i] = page;
  }
  return pages;
};

export default { pages };

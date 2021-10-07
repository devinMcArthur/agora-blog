import { Page } from "@models";

const page = async ({ id, slug }: { id?: string; slug?: string }) => {
  if (id) {
    return Page.getByID(id, { fromCache: true });
  } else if (slug) {
    return Page.getBySlug(slug, { fromCache: true });
  } else {
    return null;
  }
};

const pages = async () => {
  return await Page.getList({ fromCache: true });
};

const searchPages = async (searchString: string) => {
  return Page.search(searchString);
};

export default { page, pages, searchPages };

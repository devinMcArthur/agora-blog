import { Page } from "@models";

const page = async ({ id, slug }: { id?: string; slug?: string }) => {
  if (id) {
    return Page.getById(id);
  } else if (slug) {
    return Page.getBySlug(slug);
  } else {
    return null;
  }
};

const pages = async () => {
  return await Page.getList();
};

const searchPages = async (searchString: string, limit?: number) => {
  return Page.search(searchString, limit);
};

export default { page, pages, searchPages };

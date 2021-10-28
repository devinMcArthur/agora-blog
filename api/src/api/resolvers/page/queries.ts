import { Page } from "@models";

const page = async ({ id, slug }: { id?: string; slug?: string }) => {
  if (id) {
    return Page.getByID(id);
  } else if (slug) {
    return Page.getBySlug(slug);
  } else {
    return null;
  }
};

const pages = async () => {
  return await Page.getList();
};

const searchPages = async (searchString: string) => {
  return Page.search(searchString);
};

export default { page, pages, searchPages };

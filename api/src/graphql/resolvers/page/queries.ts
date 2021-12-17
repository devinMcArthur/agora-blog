import { Page } from "@models";
import { ListOptionData } from "@typescript/graphql";

const page = async ({ id, slug }: { id?: string; slug?: string }) => {
  if (id) {
    return Page.getById(id);
  } else if (slug) {
    return Page.getBySlug(slug);
  } else {
    return null;
  }
};

const pages = async (options?: ListOptionData) => {
  return await Page.getList(options);
};

const searchPages = async (searchString: string, limit?: number) => {
  return Page.search(searchString, limit);
};

export default { page, pages, searchPages };

import Page from "../../../models/Page";

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

export default { page, pages };

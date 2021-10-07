import { PageModel, PageDocument } from "@models";

const page = (Page: PageModel, data: any) => {
  return new Promise<PageDocument>(async (resolve, reject) => {
    try {
      const page = new Page(data);

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  page,
};

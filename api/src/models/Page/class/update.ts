import { PageConnectionDocument, PageDocument, PageModel } from "@models";

const referencedCount = (page: PageDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      page.referencedCount = await page.getReferencedCount();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const forPageConnection = (
  Page: PageModel,
  pageConnection: PageConnectionDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const page = await Page.getById(
        pageConnection.referencedPage!.toString()
      );

      if (page) {
        await page.updateReferencedCount();

        await page.save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  referencedCount,
  forPageConnection,
};

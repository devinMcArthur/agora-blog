import { PageDocument, PageModel } from "@models";

const fromV1ToV2 = (page: PageDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (page.schemaVersion !== 1)
        throw new Error("this page is not schema version 1");

      page.referencedCount = await page.getReferencedCount();

      page.schemaVersion = 2;

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const allFromV1ToV2 = (Page: PageModel) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const pages = await Page.find({ schemaVersion: 1 });

      if (pages.length > 0) {
        console.log(
          `Updating ${pages.length} page(s) from version 1 to version 2`
        );

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];

          await page.updateFromV1ToV2();

          await page.save();
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  fromV1ToV2,
  allFromV1ToV2,
};

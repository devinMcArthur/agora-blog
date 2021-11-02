import { PageDocument } from "@models";

const document = (page: PageDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await page.validate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

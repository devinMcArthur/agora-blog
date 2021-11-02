import { ParagraphDocument } from "@models";

const document = (paragraph: ParagraphDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await paragraph.validate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

import { FileDocument } from "@models";

const document = (file: FileDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      await file.validate();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default { document };

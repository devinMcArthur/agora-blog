import { dispatch } from "nact";

import { PageModel } from "..";
import { PageDocument } from "..";
import { cacheService } from "../../../server";

const page = (Page: PageModel, data: any): Promise<PageDocument> => {
  return new Promise(async (resolve, reject) => {
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

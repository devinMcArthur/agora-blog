import { Request, Response } from "express";
import Page from "../../models/Page";

const list = (req: Request, res: Response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageList = await Page.getRootPages();

      resolve({ pages: pageList });
    } catch (e) {
      reject(e);
    }
  });
};

export default { list };

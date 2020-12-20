import { Request, Response } from "express";
import Page from "../../../models/Page";

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

const bySlug = (req: Request, res: Response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const page = await Page.getBySlug(req.params.pageSlug, {
        throwError: false,
        populate: "full",
      });

      if (!page) res.status(404).send("Unable to find a Page with that slug");

      resolve({ page });
    } catch (e) {
      reject(e);
    }
  });
};

export default { list, bySlug };

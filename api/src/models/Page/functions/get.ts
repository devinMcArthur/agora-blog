import AgoraTypes from "@devin_mcarthur/agora-types";
import { Types } from "mongoose";
import { PageModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import { PageDocument } from "./index";

type PageGetPopulatedReturn<
  opts extends GetByIDOptions
> = opts["populate"] extends "normal"
  ? // Return populated document if options.populate === "normal"
    Promise<AgoraTypes.Page.Documents.PagePopulated>
  : opts["populate"] extends "full"
  ? // Return fully populated document if options.populate === "full"
    Promise<AgoraTypes.Page.Documents.PagePopulatedFull>
  : // Return Page Document if none of the above
    Promise<PageDocument>;

type PageGetReturn<
  opts extends GetByIDOptions
> = opts["throwError"] extends true
  ? // Returns normal document if options.populate === "none"
    PageGetPopulatedReturn<opts>
  : // Will either return the 3 document types or null if throwError=false
    PageGetPopulatedReturn<opts> | null;

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  populate: "none",
};
export type PageGetByID = <opts extends GetByIDOptions>(
  id: Types.ObjectId | string,
  options?: opts
) => PageGetReturn<opts>;
const byID = (
  Page: PageModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const page = await Page.findById(id);

      if (!page && options.throwError) {
        throw new Error("Page.getByID: Unable to find page");
      }

      if (options.populate === "normal") {
        resolve(await page?.populateNormal());
      } else if (options.populate === "full") {
        resolve(await page?.populateFull());
      }

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

const bySlugDefaultOptions: GetByIDOptions = {
  throwError: false,
  populate: "none",
};
export type PageGetBySlug = <opts extends GetByIDOptions>(
  slug: string,
  options?: opts
) => PageGetReturn<opts>;
const bySlug = (
  Page: PageModel,
  slug: string,
  options: GetByIDOptions = bySlugDefaultOptions
) => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, bySlugDefaultOptions);
      const page = await Page.findOne({ slug });

      if (!page && options.throwError) {
        throw new Error("Page.getBySlug: Unable to find page");
      }

      if (options.populate === "normal") {
        resolve(await page?.populateNormal());
      }

      if (options.populate === "full") {
        resolve(await page?.populateFull());
      }

      resolve(page);
    } catch (e) {
      reject(e);
    }
  });
};

export type PageGetList = () => Promise<
  AgoraTypes.Page.Documents.PagePopulated[]
>;
const list = (Page: PageModel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pages = await Page.find({});

      let populatedPages: AgoraTypes.Page.Documents.PagePopulated[] = [];
      pages.forEach(async (page) => {
        populatedPages.push(await page.populateNormal());
      });

      resolve(populatedPages);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  list,
  byID,
  bySlug,
};

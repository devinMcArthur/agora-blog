import AgoraTypes from "@devin_mcarthur/agora-types";
import { PageDocument } from ".";
import PageConnection from "../../PageConnection";
import Paragraph from "../../Paragraph";

export type PagePopulateNormal = () => Promise<AgoraTypes.Page.Documents.PagePopulated>;
const normal = (page: PageDocument) => {
  return new Promise(async (resolve, reject) => {
    try {
      const populatedPage: AgoraTypes.Page.Documents.PagePopulated = JSON.parse(
        JSON.stringify(page)
      );

      // Find current paragraph
      let currentParagraph = await Paragraph.getByID(
        page.paragraphVersionConnections[
          page.paragraphVersionConnections.length - 1
        ],
        { populate: "normal" }
      );

      if (currentParagraph) populatedPage.currentParagraph = currentParagraph;

      // Times referenced
      populatedPage.referencedCount = await PageConnection.getPageReferencedCount(
        page._id
      );

      resolve(populatedPage);
    } catch (e) {
      reject(e);
    }
  });
};

export type PagePopulateFull = () => Promise<AgoraTypes.Page.Documents.PagePopulatedFull>;
const full = (page: PageDocument) => {
  return new Promise(async (resolve, reject) => {
    try {
      const populatedPage = await page.populateNormal();

      const fullPopulatedPage: AgoraTypes.Page.Documents.PagePopulatedFull = JSON.parse(
        JSON.stringify(populatedPage)
      );

      let relatedPages = await PageConnection.getPagesThatReferencePage(
        page._id
      );

      const populatedRelatedPages: AgoraTypes.Page.Documents.PagePopulated[] = [];
      relatedPages.forEach(async (page) => {
        populatedRelatedPages.push(await page.populateNormal());
      });

      fullPopulatedPage.relatedPages = populatedRelatedPages;

      resolve(fullPopulatedPage);
    } catch (e) {
      reject(e);
    }
  });
};

export default { normal, full };

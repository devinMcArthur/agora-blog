import AgoraTypes from "@devin_mcarthur/agora-types";
import { VariableDocument } from ".";
import Variable from "..";
import VariablePageConnection from "../../VariablePageConnection";

export type VariablePopulateNormal = () => Promise<AgoraTypes.Variable.Documents.VariablePopulated>;
const normal = (variable: VariableDocument) => {
  return new Promise(async (resolve, reject) => {
    try {
      const populated: AgoraTypes.Variable.Documents.VariablePopulated = JSON.parse(
        JSON.stringify(variable)
      );

      const recentVersionIndex = populated.versions.length - 1;
      populated.versions[
        recentVersionIndex
      ].finalValue = await Variable.getFinalValue(
        variable.versions[recentVersionIndex]
      );

      resolve(populated);
    } catch (e) {
      reject(e);
    }
  });
};

export type VariablePopulateFull = () => Promise<AgoraTypes.Variable.Documents.VariablePopulatedFull>;
const full = (variable: VariableDocument) => {
  return new Promise(async (resolve, reject) => {
    try {
      const normalPopulated = await variable.populateNormal();
      const populated: AgoraTypes.Variable.Documents.VariablePopulatedFull = JSON.parse(
        JSON.stringify(normalPopulated)
      );

      let relatedPages = await VariablePageConnection.getPagesThatReferenceVariable(
        variable._id
      );
      const populatedPages: AgoraTypes.Page.Documents.PagePopulated[] = [];
      relatedPages.forEach(async (page) =>
        populatedPages.push(await page.populateNormal())
      );

      populated.relatedPages = populatedPages;

      resolve(populated);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  normal,
  full,
};

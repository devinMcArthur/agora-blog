import Page, { PageDocument } from "../../../models/Page";
import { QuestionPageConnectionDocument } from "../../../models/QuestionPageConnection";

const referrerPage = (questionPageConnection: QuestionPageConnectionDocument) => {
  return new Promise<PageDocument>(async (resolve, reject) => {
    try {
      resolve((await Page.getByID(questionPageConnection.referrerPage!.toString(), {fromCache: true}))!);
    } catch (e) {
      reject(e);
    }
  })
  
}

export default {
  referrerPage
}
import sentenceData from "./sentences";

import PageConnection from "../../typescript/interfaces/documents/PageConnection";
import SentenceFunctions from "../functions/sentence";

let pageConnections: PageConnection[] = [];

// Loop through sentences
for (let i = 0; i < sentenceData.length; i++) {
  const sentence = sentenceData[i];
  let sentencesPageConnections: PageConnection[] = [];

  // Loop through stringArray
  for (
    let s = 0;
    s < sentence.versions[sentence.versions.length - 1].stringArray.length;
    s++
  ) {
    const stringArray =
      sentence.versions[sentence.versions.length - 1].stringArray[s];

    // Loop through styles
    for (let st = 0; st < stringArray.styles.length; st++) {
      const style = stringArray.styles[st];
      let referencedPageID;

      // Find internal mentions
      if (style.type === "mention" && style.variant === "internal") {
        referencedPageID = style.value.pageID;
      }

      // Find quotes
      if (style.type === "quote") {
        const quotedSentence = SentenceFunctions.findSentence(
          style.value.sentenceID
        );

        if (quotedSentence) referencedPageID = quotedSentence.pageID;
      }

      // If page reference is found, push to sentences page connections
      if (referencedPageID)
        sentencesPageConnections.push({
          referrerPageID: sentence.pageID,
          referencedPageID,
          sentenceID: sentence._id,
        });
    }
  }

  pageConnections = pageConnections.concat(sentencesPageConnections);
}

// Remove any duplicates from connections
const checkedConnections: PageConnection[] = [];
pageConnections = pageConnections.filter((object) => {
  if (
    checkedConnections.find(
      (connection) =>
        connection.referencedPageID.toString() ===
          object.referencedPageID.toString() &&
        connection.referrerPageID.toString() ===
          object.referrerPageID.toString()
    )
  ) {
    // Found a duplicate
    return false;
  }
  // No duplicate found, add to checkedConnections array
  checkedConnections.push(object);
  return true;
});

export default pageConnections;

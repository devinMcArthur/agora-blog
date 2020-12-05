import sentenceData from "./sentences";

import VariablePageConnection from "../../typescript/interfaces/documents/VariablePageConnections";

let variablePageConnections: VariablePageConnection[] = [];

// Loop through sentences
for (let i = 0; i < sentenceData.length; i++) {
  const sentence = sentenceData[i];
  let sentencesVariablePageConnections: VariablePageConnection[] = [];

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

      // Find all mentions
      if (style.type === "variable") {
        variablePageConnections.push({
          referrerPageID: sentence.pageID,
          variableID: style.value.variableID,
          sentenceID: sentence._id,
        });
      }
    }
  }

  variablePageConnections = variablePageConnections.concat(
    sentencesVariablePageConnections
  );
}

// Remove any duplicates from connections
const checkedConnections: VariablePageConnection[] = [];
variablePageConnections = variablePageConnections.filter((object) => {
  if (
    checkedConnections.find(
      (connection) =>
        connection.referrerPageID.toString() ===
          object.referrerPageID.toString() &&
        connection.variableID.toString() === object.variableID.toString()
    )
  ) {
    // Found a duplicate
    return false;
  }
  // No duplicate found, add to checkedConnections array
  checkedConnections.push(object);
  return true;
});

export default variablePageConnections;

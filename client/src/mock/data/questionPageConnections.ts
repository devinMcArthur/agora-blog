import sentenceData from "./sentences";

import QuestionPageConnection from "../../typescript/interfaces/documents/QuestionPageConnection";

let questionPageConnections: QuestionPageConnection[] = [];

// Loop through sentences
for (let i = 0; i < sentenceData.length; i++) {
  const sentence = sentenceData[i];
  let sentencesQuestionPageConnections: QuestionPageConnection[] = [];

  // Loop through questionConnections
  for (let s = 0; s < sentence.questionConnections.length; s++) {
    const questionConnection = sentence.questionConnections[s];

    sentencesQuestionPageConnections.push({
      questionID: questionConnection.questionID,
      referrerPageID: sentence.pageID,
      sentenceID: sentence._id,
    });
  }

  questionPageConnections = questionPageConnections.concat(
    sentencesQuestionPageConnections
  );
}

// Remove any duplicates from connections
const checkedConnections: QuestionPageConnection[] = [];
questionPageConnections = questionPageConnections.filter((object) => {
  if (
    checkedConnections.find(
      (connection) =>
        connection.questionID.toString() === object.questionID.toString() &&
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

export default questionPageConnections;

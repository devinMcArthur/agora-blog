import clearDatabase from "./clearDatabase";

import createStatements from "./documents/statements";
import createPages, { SeededPages } from "./documents/pages";
import createQuestions, { SeededQuestions } from "./documents/questions";
import createVariables, { SeededVariables } from "./documents/variables";
import createParagraphs, { SeededParagraphs } from "./documents/paragraphs";

import createPageConnections from "./documents/pageConnections";
import createQuestionPageConnections from "./documents/questionPageConnections";
import createVariablePageConnections from "./documents/variablePageConnections";

const seedDatabase = () => {
  return new Promise<{
    pages: SeededPages;
    paragraphs: SeededParagraphs;
    questions: SeededQuestions;
    variables: SeededVariables;
  }>(async (resolve, reject) => {
    try {
      // Clear database
      await clearDatabase();

      // Create primary Documents
      const pages = await createPages();
      const questions = await createQuestions();
      const variables = await createVariables();
      const paragraphs = await createParagraphs();
      await createStatements();

      // Create connection documents
      await createPageConnections();
      await createQuestionPageConnections();
      await createVariablePageConnections();

      console.log("Database seeded");

      resolve({
        pages,
        paragraphs,
        questions,
        variables,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default seedDatabase;

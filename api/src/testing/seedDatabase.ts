import clearDatabase from "./clearDatabase";

import createStatements from "./documents/statements";
import createPages, { SeededPages } from "./documents/pages";
import createQuestions, { SeededQuestions } from "./documents/questions";
import createVariables, { SeededVariables } from "./documents/variables";
import createParagraphs, { SeededParagraphs } from "./documents/paragraphs";

import createPageConnections from "./documents/pageConnections";
import createQuestionPageConnections from "./documents/questionPageConnections";
import createVariablePageConnections from "./documents/variablePageConnections";
import createUsers, { ISeededUsers } from "./documents/users";
import createParagraphEditProposals, {
  ISeededParagraphEditProposals,
} from "./documents/paragraphEditProposals";

export interface SeededDatabase {
  users: ISeededUsers;
  pages: SeededPages;
  paragraphs: SeededParagraphs;
  questions: SeededQuestions;
  variables: SeededVariables;
  paragraphEditProposals: ISeededParagraphEditProposals;
}

const seedDatabase = () => {
  return new Promise<SeededDatabase>(async (resolve, reject) => {
    try {
      // Clear database
      await clearDatabase();

      // Create primary Documents
      const users = await createUsers();
      const pages = await createPages();
      const questions = await createQuestions();
      const variables = await createVariables();
      const paragraphs = await createParagraphs();
      const paragraphEditProposals = await createParagraphEditProposals();
      await createStatements();

      // Create connection documents
      await createPageConnections();
      await createQuestionPageConnections();
      await createVariablePageConnections();

      console.log("Database seeded");

      resolve({
        users,
        pages,
        paragraphs,
        questions,
        variables,
        paragraphEditProposals,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default seedDatabase;

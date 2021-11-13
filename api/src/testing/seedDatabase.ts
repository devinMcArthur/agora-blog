import clearDatabase from "./clearDatabase";

import createStatements from "./documents/statements";
import createPages, { SeededPages } from "./documents/pages";
import createQuestions, { SeededQuestions } from "./documents/questions";
import createVariables, { SeededVariables } from "./documents/variables";
import createParagraphs, { SeededParagraphs } from "./documents/paragraphs";

import createUsers, { ISeededUsers } from "./documents/users";
import createParagraphEditProposals, {
  ISeededParagraphEditProposals,
} from "./documents/paragraphEditProposals";
import createFiles, { ISeededFiles } from "./documents/files";
import createVariableEditProposals, {
  ISeededVariableEditProposals,
} from "./documents/variableEditProposals";

export interface SeededDatabase {
  files: ISeededFiles;
  users: ISeededUsers;
  pages: SeededPages;
  paragraphs: SeededParagraphs;
  questions: SeededQuestions;
  variables: SeededVariables;
  variableEditProposals: ISeededVariableEditProposals;
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
      const variableEditProposals = await createVariableEditProposals();
      const files = await createFiles();
      await createStatements();

      console.log("Database seeded");

      resolve({
        files,
        users,
        pages,
        paragraphs,
        questions,
        variables,
        variableEditProposals,
        paragraphEditProposals,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export default seedDatabase;

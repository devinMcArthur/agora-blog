import { User, Variable, VariableDocument } from "@models";
import isUrl from "@validation/isUrl";
import validateVariableVersion from "@validation/validateVariableVersion";

const document = (variable: VariableDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // check for title
      if (!variable.title) throw new Error("must provide a title");

      // check for duplicate title
      const existingVariable = await Variable.getByTitle(variable.title);
      if (
        existingVariable &&
        existingVariable._id.toString() !== variable._id.toString()
      )
        throw new Error("a variable already exists with this title");

      // validate author
      if (!variable.originalAuthor) throw new Error("must provide an author");
      const author = await User.getById(variable.originalAuthor!.toString());
      if (!author)
        throw new Error("could not find the author of this variable");

      // ensure most recent version is valid
      const currentVersion = variable.versions[variable.versions.length - 1];

      await validateVariableVersion(currentVersion);

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};

import {
  Page,
  Question,
  Statement,
  StatementDocument,
  User,
  Variable,
  File,
} from "@models";
import { StyleTypes, StyleVariants } from "@typescript/models/Statement";
import isUrl from "@validation/isUrl";

const document = (statement: StatementDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // validate author
      const author = await User.getById(statement.originalAuthor!.toString());
      if (!author) throw new Error("invalid author provided");

      // validate versions
      for (let i = 0; i < statement.versions.length; i++) {
        const version = statement.versions[i];

        if (
          version.stringArray &&
          version.stringArray.length > 0 &&
          !version.quotedStatement
        ) {
          // validates string array

          for (let j = 0; j < version.stringArray.length; j++) {
            const stringArray = version.stringArray[j];

            let requiresString = true;
            for (let s = 0; s < stringArray.styles.length; s++) {
              const style = stringArray.styles[s];

              if (style.type === StyleTypes.mention) {
                if (style.variant === StyleVariants.external) {
                  // external mentions
                  if (!style.value.url)
                    throw new Error(
                      "must provide a url for an external mention"
                    );

                  if (!isUrl(style.value.url))
                    throw new Error("must provide a valid url");
                } else if (style.variant === StyleVariants.internal) {
                  // internal mentions
                  if (!style.value.page)
                    throw new Error(
                      "must provide a page for an internal mention"
                    );

                  const mentionedPage = await Page.getById(
                    style.value.page.toString()
                  );
                  if (!mentionedPage)
                    throw new Error("could not find mentioned page");

                  if (
                    mentionedPage._id.toString() === statement.page!.toString()
                  )
                    throw new Error(
                      "cannot mention the page this statement belongs to"
                    );
                } else throw new Error("must provide a valid variant");
              }

              if (style.type === StyleTypes.variable) {
                requiresString = false;

                if (!style.value.variable)
                  throw new Error("must provide a variable to reference");

                const variable = await Variable.getById(
                  style.value.variable.toString()
                );
                if (!variable)
                  throw new Error("unable to find referenced variable");
              }

              if (style.type === StyleTypes.quote) {
                requiresString = false;

                if (!style.value.statement)
                  throw new Error("must provide a statement to quote");

                const fetchedStatement = await Statement.getById(
                  style.value.statement.toString()
                );
                if (!fetchedStatement)
                  throw new Error("unable to find quoted statement");
              }

              if (style.type === StyleTypes.image) {
                // validate image
                requiresString = false;

                if (!style.value.image)
                  throw new Error("must provide an image object");

                if (
                  style.value.image.sourceUrl &&
                  !isUrl(style.value.image.sourceUrl)
                )
                  throw new Error("must provide a valid source url");

                if (!style.value.image.file)
                  throw new Error("must provide a file");

                const file = await File.getById(
                  style.value.image.file.toString()
                );
                if (!file) throw new Error("unable to find file");
              }
            }

            // validate string if neccesary
            if (requiresString && stringArray.string === undefined)
              throw new Error("must provide a string for this item");
          }
        } else if (
          (!version.stringArray || version.stringArray.length < 1) &&
          version.quotedStatement
        ) {
          // validate quoted statement

          const quotedStatement = await Statement.getById(
            version.quotedStatement.toString()
          );
          if (!quotedStatement)
            throw new Error("unable to find quoted statement");

          if (quotedStatement.page!.toString() === statement.page!.toString())
            throw new Error(
              "cannot quote a statement that belongs to the same page"
            );
        } else {
          throw new Error(
            "must provide either a string array or quoted statement"
          );
        }

        // validate questions
        if (version.questions.length < 1)
          throw new Error("statement must reference at least one question");

        for (let q = 0; q < version.questions.length; q++) {
          const fetchedQuestion = await Question.getById(
            version.questions[q]!.toString()
          );
          if (!fetchedQuestion) throw new Error("cannot find question");
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default { document };

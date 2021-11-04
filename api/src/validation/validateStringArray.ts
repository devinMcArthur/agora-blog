import { File, Page, Statement, StringArrayClass, Variable } from "@models";
import { isEmpty } from "class-validator";
import isUrl from "./isUrl";

const validateStringArray = (stringArray: StringArrayClass[]) => {
  return new Promise<void>(async (resolve, reject) => {
    for (let i = 0; i < stringArray.length; i++) {
      const element = stringArray[i];

      for (let j = 0; j < element.styles.length; j++) {
        const style = element.styles[j];

        try {
          switch (style.type) {
            case "image": {
              /**
               * Image Style
               */
              if (!style.value.image)
                throw new Error(`must provide image data`);

              if (
                style.value.image.sourceUrl &&
                !isUrl(style.value.image.sourceUrl)
              )
                throw new Error("source url must be valid");

              if (!isEmpty(element.string))
                throw new Error("cannot have a string with image style");

              if (!style.value.image.file)
                throw new Error("must include a file");

              const file = await File.getById(
                style.value.image.file.toString()
              );
              if (!file) throw new Error("cannot find saved file");

              break;
            }
            case "mention": {
              /**
               * Mention Style
               */
              if (style.variant === "external") {
                if (!style.value.url)
                  throw new Error("must provide a url for external mention");

                if (!isUrl(style.value.url))
                  throw new Error(
                    "must provide a valid url for external mention"
                  );
              } else if (style.variant === "internal") {
                if (!style.value.page)
                  throw new Error("must provide a page for internal mention");

                const mentionedPage = await Page.getById(
                  style.value.page.toString()
                );
                if (!mentionedPage)
                  throw new Error("could not find mentioned page");
              }

              break;
            }
            case "quote": {
              /**
               * Quote Style
               */
              if (!style.value.statement)
                throw new Error("must provide a statement to quote");

              const quotedStatement = await Statement.getById(
                style.value.statement.toString()
              );
              if (!quotedStatement)
                throw new Error("unable to find quoted statement");

              if (!isEmpty(element.string))
                throw new Error("cannot have a string when quoting");

              break;
            }
            case "variable": {
              /**
               * Variable Style
               */
              if (!style.value.variable)
                throw new Error("must provide a variable to reference");

              const variable = await Variable.getById(
                style.value.variable.toString()
              );
              if (!variable)
                throw new Error("unable to find referenced variable");

              break;
            }
          }

          resolve();
        } catch (e: any) {
          reject(new Error(`stringArray[${i}].styles[${j}] - ${e.message}`));
        }
      }
    }

    resolve();
  });
};

export default validateStringArray;

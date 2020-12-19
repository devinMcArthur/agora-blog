import AgoraTypes from "@devin_mcarthur/agora-types";
import { StatementDocument } from ".";
import Statement from "..";
import Page from "../../Page";
import Question from "../../Question";
import Variable from "../../Variable";

const normal = (statement: StatementDocument) => {
  return new Promise<AgoraTypes.Statement.Documents.StatementPopulated>(
    async (resolve, reject) => {
      try {
        const populatedStatement: AgoraTypes.Statement.Documents.StatementPopulated = JSON.parse(
          JSON.stringify(statement)
        );

        // String Array
        let stringArray =
          populatedStatement.versions[populatedStatement.versions.length - 1]
            .stringArray;
        for (let i = 0; i < stringArray.length; i++) {
          const object = stringArray[i];

          // Styles
          for (let s = 0; s < object.styles.length; s++) {
            const style = object.styles[s];

            switch (style.type) {
              case "quote":
                // Quote Style
                const statementDoc = await Statement.getByID(
                  style.value.statementID,
                  {
                    throwError: true,
                    populate: "normal",
                  }
                );
                const page = await Page.getByID(statementDoc.pageID, {
                  throwError: true,
                });
                style.value.statement = statementDoc;
                style.value.page = page;
                break;
              case "mention":
                if (style.variant === "internal") {
                  style.value.page = await Page.getByID(style.value.pageID, {
                    throwError: true,
                  });
                }
                break;
              case "variable":
                style.value.variable = await Variable.getByID(
                  style.value.variableID,
                  {
                    throwError: true,
                    populate: "normal",
                  }
                );
                break;
              default:
                break;
            }
          }
        }

        // Questions
        populatedStatement.questions = [];
        for (let i = 0; i < populatedStatement.questions.length; i++) {
          populatedStatement.questions[i] = await Question.getByID(
            statement.questions[i],
            {
              throwError: true,
            }
          );
        }

        // Sources
        if (populatedStatement.sources?.pages) {
          for (let i = 0; i < populatedStatement.sources.pages.length; i++) {
            populatedStatement.sources.pages[i] = await Page.getByID(
              statement.sources.pages[i].pageID,
              {
                throwError: true,
              }
            );
          }
        }

        resolve(populatedStatement);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default { normal };

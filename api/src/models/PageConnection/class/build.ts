import { Types } from "mongoose";
import { PageConnectionModel, Statement, StatementDocument } from "@models";
import { StyleTypes } from "@typescript/models/Statement";

const forStatement = (
  PageConnection: PageConnectionModel,
  statement: StatementDocument
) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const referrerPage = statement.page;
      const existingConnections = await PageConnection.getByStatement(
        statement
      );

      const getRequiredConnections = (): Promise<Types.ObjectId[]> => {
        return new Promise(async (resolve, reject) => {
          try {
            const requiredConnections: Types.ObjectId[] = [];

            const addRequiredConnection = (pageId: Types.ObjectId) => {
              if (requiredConnections.indexOf(pageId) === -1)
                requiredConnections.push(pageId);
            };

            // handle quotedStatements
            if (statement.currentVersion.quotedStatement) {
              const quotedStatement = await Statement.getById(
                statement.currentVersion.quotedStatement.toString()
              );

              if (quotedStatement) {
                addRequiredConnection(quotedStatement.page as Types.ObjectId);
                resolve(requiredConnections);
              }
            }

            // loop through most recent string array for quotes and mentions
            for (
              let i = 0;
              i < statement.currentVersion.stringArray.length;
              i++
            ) {
              const stringArray = statement.currentVersion.stringArray[i];

              // loop through styles
              for (let s = 0; s < stringArray.styles.length; s++) {
                const style = stringArray.styles[s];

                // handle mentions
                if (
                  style.type === StyleTypes.mention &&
                  style.variant === "internal" &&
                  style.value.page
                ) {
                  addRequiredConnection(style.value.page as Types.ObjectId);
                }

                // handle inline quote
                if (style.type === StyleTypes.quote && style.value.statement) {
                  const quotedStatement = await Statement.getById(
                    style.value.statement.toString()
                  );

                  if (quotedStatement)
                    addRequiredConnection(
                      quotedStatement.page as Types.ObjectId
                    );
                }
              }
            }

            resolve(requiredConnections);
          } catch (e) {
            reject(e);
          }
        });
      };

      // just remove all existing connections if no longer 'current'
      if (statement.current === false) {
        for (let i = 0; i < existingConnections.length; i++) {
          await existingConnections[i].remove();
        }

        resolve();
        return;
      }

      // get required connections for current statement version
      const requiredConnections: Types.ObjectId[] =
        await getRequiredConnections();

      // get all new connections
      const existingConnectionsMap = existingConnections.map(
        (pageConnection) => pageConnection.referencedPage
      );
      const newRequiredConnections = requiredConnections.filter(
        (connection) => {
          if (existingConnectionsMap.includes(connection)) return false;
          else return true;
        }
      );

      // create all new connections
      for (let i = 0; i < newRequiredConnections.length; i++) {
        const referencedPageId = newRequiredConnections[i];

        if (referencedPageId !== referrerPage) {
          const pageConnection = new PageConnection({
            referencedPage: referencedPageId,
            referrerPage,
            statement: statement._id,
          });

          try {
            await pageConnection.save();
          } catch (e) {
            console.error(e);
          }
        }
      }

      // remove all old connections
      const oldConnections = existingConnections.filter(
        (existingConnection) => {
          if (
            !requiredConnections.includes(
              existingConnection.referencedPage as Types.ObjectId
            )
          )
            return true;
          else return false;
        }
      );
      for (let i = 0; i < oldConnections.length; i++) {
        if (
          oldConnections[i].referrerPage!.toString() ===
            referrerPage!.toString() &&
          oldConnections[i].statement!.toString() ===
            statement._id.toHexString()
        ) {
          await oldConnections[i].remove();
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  forStatement,
};

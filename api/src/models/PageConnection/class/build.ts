import { Types } from "mongoose";
import {
  PageConnectionDocument,
  PageConnectionModel,
  Statement,
  StatementDocument,
} from "@models";
import { StyleTypes } from "@typescript/models/Statement";
import { IPageConnectionData } from "@typescript/models/PageConnection";

const build = (
  PageConnection: PageConnectionModel,
  data: IPageConnectionData
) => {
  return new Promise<PageConnectionDocument>(async (resolve, reject) => {
    try {
      // See if there is an existing connection
      let pageConnection = await PageConnection.getByPages(
        data.referrerPageId,
        data.referencedPageId
      );
      if (pageConnection) {
        // add statement if not already there

        await pageConnection.addStatement(
          Types.ObjectId(data.statementId.toString())
        );
      } else {
        // create new page connection if necessary

        pageConnection = new PageConnection({
          referencedPage: data.referencedPageId,
          referrerPage: data.referrerPageId,
          statements: [data.statementId],
        });
      }

      resolve(pageConnection);
    } catch (e) {
      reject(e);
    }
  });
};

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
          try {
            await existingConnections[i].removeStatement(statement);
          } catch (e) {
            // do nothing
          }
        }

        resolve();
        return;
      }

      // get required connections for current statement version (referencedPage)
      const requiredConnections: Types.ObjectId[] =
        await getRequiredConnections();

      // get all new connections
      const existingConnectionsMap = existingConnections.map((pageConnection) =>
        pageConnection.referencedPage!.toString()
      );
      const newRequiredConnections = requiredConnections.filter(
        (connection) => {
          if (existingConnectionsMap.includes(connection.toString()))
            return false;
          else return true;
        }
      );

      // create all new connections
      for (let i = 0; i < newRequiredConnections.length; i++) {
        const referencedPageId = newRequiredConnections[i];

        if (referencedPageId !== referrerPage) {
          // build / add statement to existing page connection
          const pageConnection = await PageConnection.build({
            referencedPageId: referencedPageId,
            referrerPageId: referrerPage!.toString(),
            statementId: statement._id,
          });

          try {
            await pageConnection.save();
          } catch (e) {
            console.error(e);
          }
        }
      }

      // remove all old connections
      const requiredConnectionsMap = requiredConnections.map((connection) =>
        connection.toString()
      );
      const oldConnections = existingConnections.filter(
        (existingConnection) => {
          if (
            !requiredConnectionsMap.includes(
              existingConnection.referencedPage!.toString()
            )
          )
            return true;
          else return false;
        }
      );
      for (let i = 0; i < oldConnections.length; i++) {
        if (
          oldConnections[i].referrerPage!.toString() ===
          referrerPage!.toString()
        ) {
          try {
            await oldConnections[i].removeStatement(statement);
          } catch (e) {
            // do nothing
          }
        }
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
  forStatement,
};

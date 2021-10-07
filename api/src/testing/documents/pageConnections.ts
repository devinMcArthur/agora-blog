import { Statement, PageConnection, PageConnectionDocument } from "@models";

const createPageConnections = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // Get all statements
      const statements = await Statement.find({ current: true });
      let pageConnections: PageConnectionDocument[] = [];

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        let statementsPageConnections: PageConnectionDocument[] = [];

        // Loop through stringArray
        for (
          let s = 0;
          s <
          statement.versions[statement.versions.length - 1].stringArray.length;
          s++
        ) {
          const stringArray =
            statement.versions[statement.versions.length - 1].stringArray[s];

          // Loop through styles
          for (let st = 0; st < stringArray.styles.length; st++) {
            const style = stringArray.styles[st];
            let referencedPageID;

            // Find internal mentions
            if (style.type === "mention" && style.variant === "internal") {
              referencedPageID = style.value.page;
            }

            // Find quotes
            if (style.type === "quote") {
              const quotedSentence = await Statement.findById(
                style.value.statement
              );

              if (quotedSentence) referencedPageID = quotedSentence.page;
            }

            // If page reference is found, push to statements page connections
            if (referencedPageID) {
              const pageConnection: PageConnectionDocument = new PageConnection(
                {
                  referrerPage: statement.page,
                  referencedPage: referencedPageID,
                  statement: statement._id,
                }
              );
              statementsPageConnections.push(pageConnection);
            }
          }
        }

        pageConnections = pageConnections.concat(statementsPageConnections);
      }

      // Remove any duplicates from connections
      const checkedConnections: PageConnectionDocument[] = [];
      pageConnections = pageConnections.filter((object) => {
        if (
          checkedConnections.find(
            (connection) =>
              connection.referencedPage!.toString() ===
                object.referencedPage!.toString() &&
              connection.referrerPage!.toString() ===
                object.referrerPage!.toString()
          )
        ) {
          // Found a duplicate
          return false;
        }
        // No duplicate found, add to checkedConnections array
        checkedConnections.push(object);
        return true;
      });

      // Save all documents
      for (let i = 0; i < pageConnections.length; i++) {
        await pageConnections[i].save();
      }

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default createPageConnections;

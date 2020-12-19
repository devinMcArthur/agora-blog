import AgoraTypes from "@devin_mcarthur/agora-types";
import { ParagraphDocument } from ".";
import Statement from "../../Statement";

export type ParagraphPopulateNormal = () => Promise<AgoraTypes.Paragraph.Documents.ParagraphPopulated>;
const normal = (paragraph: ParagraphDocument) => {
  return new Promise<AgoraTypes.Paragraph.Documents.ParagraphPopulated>(
    async (resolve, reject) => {
      try {
        const populatedParagraph: AgoraTypes.Paragraph.Documents.ParagraphPopulated = JSON.parse(
          JSON.stringify(paragraph)
        );

        let statements: AgoraTypes.Statement.Documents.StatementPopulated[] = [];
        for (let i in paragraph.statements) {
          const statement = await Statement.getByID(paragraph.statements[i], {
            populate: "normal",
            throwError: true,
          });
          statements.push(statement);
        }

        populatedParagraph.statements = statements;

        resolve(populatedParagraph);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  normal,
};

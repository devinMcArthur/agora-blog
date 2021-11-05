import { IParagraphFormState } from "../contexts/ParagraphForm";
import { ParagraphEditProposalData } from "../generated/graphql";
import { EditProposalChangeTypes } from "../models/paragraphEditProposal";
import { StatementElementType } from "../models/slate";

const convertToParagraphEditProposal = (
  state: IParagraphFormState
): ParagraphEditProposalData["statementItems"] => {
  const statements: ParagraphEditProposalData["statementItems"] = [];

  if (state.originalParagraph && state.paragraph && state.slateParagraph) {
    // Find all removed statements
    const originalStatements = state.originalParagraph.statements.map((statement) => statement.statement._id)
    const currentStatements = state.paragraph.statements.map((statement) => statement.statement._id)

    /**
     * @todo how do we properly place these items in the edit proposal
     *   - they will not be in state.paragraph.statements
     */
    const removalIds: string[] = originalStatements.filter((id) => {
      if (!currentStatements.includes(id)) return true
      else return false
    })

    for (let i = 0; i < state.slateParagraph.length; i++) {
      let changeType: EditProposalChangeTypes = EditProposalChangeTypes.NONE
      const paragraphStatement = state.slateParagraph[i] as StatementElementType;

      console.log("paragraphStatement", paragraphStatement);

      // paragraphStatement.

      statements.push({
        changeType,
        
      })
    }
  }

  return statements;
};

export default convertToParagraphEditProposal;

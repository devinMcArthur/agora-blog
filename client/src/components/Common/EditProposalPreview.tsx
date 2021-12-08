import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import {
  FullParagraphEditProposalSnippetFragment,
  useFullParagraphEditProposalLazyQuery,
} from "../../generated/graphql";
import Loading from "./Loading";
import ParagraphEditProposalStatementContainer from "./ParagraphEditProposalStatementContainer";

interface IEditProposalPreview {
  editProposalId: string;
  closePreview: () => void;
}

const EditProposalPreview = ({
  editProposalId,
  closePreview,
}: IEditProposalPreview) => {
  const [editProposal, setEditProposal] =
    React.useState<FullParagraphEditProposalSnippetFragment>();
  const [query, { data, loading }] = useFullParagraphEditProposalLazyQuery();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!editProposal || editProposal._id !== editProposalId) {
      query({
        variables: {
          id: editProposalId,
        },
      });
    }
  }, [editProposalId, editProposal, query]);

  React.useEffect(() => {
    if (data?.paragraphEditProposal && !loading) {
      setEditProposal(data.paragraphEditProposal);
    }
  }, [data, loading]);

  /**
   * ----- Rendering -----
   */

  return React.useMemo(() => {
    if (editProposal) {
      const statements = editProposal.statementItems.map((statement, index) => {
        return (
          <ParagraphEditProposalStatementContainer
            editProposalStatement={statement}
            pageId={editProposal.paragraph.page._id}
            key={index}
          />
        );
      });

      return (
        <Box display="flex" flexDir="column">
          <Alert status="info" mb={3}>
            <Box display="flex" flexDir="column" w="100%">
              <Box display="flex" flexDir="row" justifyContent="space-between">
                <Box display="flex" flexDir="row">
                  <AlertIcon />
                  <AlertTitle>Previewing:</AlertTitle>
                  <AlertDescription>
                    Proposal by {editProposal.author.firstName}{" "}
                    {editProposal.author.lastName}
                  </AlertDescription>
                </Box>
                <CloseButton onClick={() => closePreview()} />
              </Box>
              {editProposal.description}
            </Box>
          </Alert>
          {statements}
        </Box>
      );
    } else return <Loading />;
  }, [closePreview, editProposal]);
};

export default EditProposalPreview;

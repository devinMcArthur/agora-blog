import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { useDrawer } from "../../contexts/Drawer";
import {
  FullParagraphEditProposalSnippetFragment,
  useFullParagraphEditProposalLazyQuery,
} from "../../generated/graphql";
import Loading from "./Loading";
import ParagraphEditProposalStatement from "./ParagraphEditProposalStatement";

interface IEditProposalPreview {
  editProposalId: string;
}

const EditProposalPreview = ({ editProposalId }: IEditProposalPreview) => {
  const [editProposal, setEditProposal] =
    React.useState<FullParagraphEditProposalSnippetFragment>();
  const [query, { data, loading }] = useFullParagraphEditProposalLazyQuery();

  const {
    state: { editProposalStatement },
    setEditProposalStatement,
    clearEditProposalStatement,
    setPreviewedParagraphEditProposal,
  } = useDrawer();

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
        const selected = editProposalStatement?._id === statement._id;
        let backgroundColor = "gray.100",
          changeType;
        if (selected) backgroundColor = "gray.200";

        if (statement.changeType === "EDIT") {
          changeType = "editted";
          backgroundColor = "yellow.100";
          if (selected) backgroundColor = "yellow.200";
        } else if (statement.changeType === "REMOVE") {
          changeType = "removed";
          backgroundColor = "red.100";
          if (selected) backgroundColor = "red.200";
        } else if (statement.changeType === "ADD") {
          changeType = "added";
          backgroundColor = "green.100";
          if (selected) backgroundColor = "green.200";
        }

        return (
          <Box
            key={index}
            display="flex"
            flexDir="row"
            my={2}
            backgroundColor={backgroundColor}
            borderRadius="0 1em 1em 0"
            cursor="pointer"
            onClick={() =>
              selected
                ? clearEditProposalStatement()
                : setEditProposalStatement(statement)
            }
          >
            <Box flexShrink={0} width="5px" backgroundColor="gray.600" mr={4} />
            <Box display="flex" flexDir="column" my={2}>
              <ParagraphEditProposalStatement
                statement={statement}
                versionIndex="EDIT"
              />
              {changeType && (
                <Text size="xs" color="gray.600">
                  {changeType}
                </Text>
              )}
            </Box>
          </Box>
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
                <CloseButton
                  onClick={() => setPreviewedParagraphEditProposal(undefined)}
                />
              </Box>
              {editProposal.description}
            </Box>
          </Alert>
          {statements}
        </Box>
      );
    } else return <Loading />;
  }, [
    clearEditProposalStatement,
    editProposal,
    editProposalStatement?._id,
    setEditProposalStatement,
    setPreviewedParagraphEditProposal,
  ]);
};

export default EditProposalPreview;

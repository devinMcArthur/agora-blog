import React from "react";

import { Checkbox } from "@chakra-ui/checkbox";
import { Box, BoxProps, Text } from "@chakra-ui/layout";

import {
  PreviewParagraphEditProposalSnippetFragment,
  useApproveParagraphEditProposalMutation,
  usePreviewParagraphEditProposalLazyQuery,
} from "../../generated/graphql";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import UserLink from "./UserLink";
import { Button } from "@chakra-ui/button";
import { useAuth } from "../../contexts/Auth";

interface IParagraphEditProposal extends BoxProps {
  paragraphEditProposalId: string;
  editProposalPreviewSelection?: (editProposalId?: string) => void;
  onApproval?: () => void;
  editProposalSelected?: boolean;
  allowApproval?: boolean;
}

const ParagraphEditProposal = ({
  paragraphEditProposalId,
  editProposalSelected,
  allowApproval = false,
  editProposalPreviewSelection,
  onApproval,
  ...props
}: IParagraphEditProposal) => {
  const {
    state: { user },
  } = useAuth();

  const [editProposal, setEditProposal] =
    React.useState<PreviewParagraphEditProposalSnippetFragment>();
  const [query, { data, loading: queryLoading, networkStatus }] =
    usePreviewParagraphEditProposalLazyQuery();
  const [approve, { loading: approvalLoading }] =
    useApproveParagraphEditProposalMutation();

  /**
   * ----- Functions -----
   */

  const handleApproval = React.useCallback(() => {
    if (editProposal) {
      approve({
        variables: { id: editProposal?._id },
      })
        .then(() => {
          if (onApproval) onApproval();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    }
  }, [approve, editProposal, onApproval]);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (!editProposal && networkStatus === 7) {
      query({
        variables: {
          id: paragraphEditProposalId,
        },
      });
    }
  }, [query, editProposal, networkStatus, paragraphEditProposalId]);

  React.useEffect(() => {
    if (data?.paragraphEditProposal && !queryLoading) {
      setEditProposal(data.paragraphEditProposal);
    }
  }, [data, queryLoading]);

  React.useEffect(() => {
    setEditProposal(undefined);
  }, [paragraphEditProposalId]);

  /**
   * ----- Rendering -----
   */

  let content = <SkeletonCard variant="page" minW="25rem" />;
  if (editProposal) {
    content = (
      <Card minW="25rem" {...props}>
        <Box display="flex" flexDir="column">
          <Box display="flex" flexDir="row" justifyContent="space-between">
            <Text>{editProposal.description}</Text>
            <UserLink user={editProposal.author} />
          </Box>
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            pt={2}
          >
            {editProposalPreviewSelection && (
              <Checkbox
                mx={2}
                checked={editProposalSelected}
                isChecked={editProposalSelected}
                onChange={(e) => {
                  if (e.target.checked)
                    editProposalPreviewSelection(editProposal._id);
                  else editProposalPreviewSelection();
                }}
              >
                Preview
              </Checkbox>
            )}
            {allowApproval && user?.verified && (
              <Button
                mx={2}
                variant="outline"
                onClick={() => handleApproval()}
                isLoading={approvalLoading}
              >
                Approve
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    );
  }

  return content;
};

export default ParagraphEditProposal;

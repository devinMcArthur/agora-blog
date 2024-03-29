import React from "react";

import { Checkbox } from "@chakra-ui/checkbox";
import { Box, BoxProps, Text } from "@chakra-ui/layout";

import {
  ApproveParagraphEditProposalMutation,
  Exact,
  PreviewParagraphEditProposalSnippetFragment,
  useApproveParagraphEditProposalMutation,
  usePreviewParagraphEditProposalLazyQuery,
} from "../../generated/graphql";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import UserLink from "./UserLink";
import { Button } from "@chakra-ui/button";
import { useAuth } from "../../contexts/Auth";
import TextLink from "./TextLink";
import createLink from "../../utils/createLink";
import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";

interface IParagraphEditProposalCard extends BoxProps {
  paragraphEditProposalId: string;
  editProposalPreviewSelection?: (editProposalId?: string) => void;
  onApproval?: () => void;
  editProposalSelected?: boolean;
  allowApproval?: boolean;
  previewLink?: boolean;
  approvalUpdate?: MutationUpdaterFunction<
    ApproveParagraphEditProposalMutation,
    Exact<{
      id: string;
    }>,
    DefaultContext,
    ApolloCache<any>
  >;
}

const ParagraphEditProposalCard = ({
  paragraphEditProposalId,
  editProposalSelected,
  allowApproval = false,
  approvalUpdate,
  previewLink = false,
  editProposalPreviewSelection,
  onApproval,
  ...props
}: IParagraphEditProposalCard) => {
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
        update: approvalUpdate,
      })
        .then(() => {
          if (onApproval) onApproval();
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    }
  }, [approvalUpdate, approve, editProposal, onApproval]);

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

  let content = <SkeletonCard minW="10em" variant="page" />;
  if (editProposal) {
    content = (
      <Card w="100%" {...props}>
        <Box display="flex" flexDir="column">
          <Box display="flex" flexDir="row" justifyContent="space-between">
            <Text pr={2}>{editProposal.description}</Text>
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
            {previewLink && (
              <TextLink
                link={createLink.pageLink(editProposal.paragraph.page.slug, {
                  type: "edit-proposal",
                  proposalId: editProposal._id,
                })}
              >
                Preview
              </TextLink>
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

export default ParagraphEditProposalCard;

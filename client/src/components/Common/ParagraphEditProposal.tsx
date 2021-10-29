import React from "react";

import { Checkbox } from "@chakra-ui/checkbox";
import { Box, BoxProps, Text } from "@chakra-ui/layout";

import {
  PreviewParagraphEditProposalSnippetFragment,
  usePreviewParagraphEditProposalLazyQuery,
} from "../../generated/graphql";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import UserLink from "./UserLink";

interface IParagraphEditProposal extends BoxProps {
  paragraphEditProposalId: string;
  editProposalPreviewSelection?: (editProposalId?: string) => void;
  editProposalSelected?: boolean;
}

const ParagraphEditProposal = ({
  paragraphEditProposalId,
  editProposalSelected,
  editProposalPreviewSelection,
  ...props
}: IParagraphEditProposal) => {
  const [editProposal, setEditProposal] =
    React.useState<PreviewParagraphEditProposalSnippetFragment>();
  const [query, { data, loading, networkStatus }] =
    usePreviewParagraphEditProposalLazyQuery();

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
    if (data?.paragraphEditProposal && !loading) {
      setEditProposal(data.paragraphEditProposal);
    }
  }, [data, loading]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (!editProposal) return <SkeletonCard variant="page" />;
    else
      return (
        <Card {...props}>
          <Box display="flex" flexDir="column">
            <Box display="flex" flexDir="row" justifyContent="space-between">
              <Text>{editProposal.description}</Text>
              <UserLink user={editProposal.author} />
            </Box>
            <Box display="flex" justifyContent="start">
              {editProposalPreviewSelection && (
                <Checkbox
                  checked={editProposalSelected}
                  onChange={(e) => {
                    if (e.target.checked)
                      editProposalPreviewSelection(editProposal._id);
                    else editProposalPreviewSelection();
                  }}
                >
                  Preview
                </Checkbox>
              )}
            </Box>
          </Box>
        </Card>
      );
  }, [editProposal, editProposalPreviewSelection, editProposalSelected, props]);

  return content;
};

export default ParagraphEditProposal;

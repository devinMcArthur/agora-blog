import { IconButton } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  DisplayParagraphSnippetFragment,
  useParagraphLazyQuery,
} from "../../generated/graphql";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import EditProposalPreview from "./EditProposalPreview";
import Loading from "./Loading";
import Paragraph from "./Paragraph";
import ParagraphEditProposalCard from "./ParagraphEditProposalCard";

interface IParagraphs {
  mostRecentParagraph?: DisplayParagraphSnippetFragment;
  paragraphIds: string[];

  // allows edit proposal preview to be toggled from parent
  previewEditProposal?: string;
  onClearPreviewedProposal?: () => void;
}

const Paragraphs = ({
  mostRecentParagraph,
  paragraphIds,
  previewEditProposal,
  onClearPreviewedProposal,
}: IParagraphs) => {
  /**
   * ----- Hook Initialization
   */

  const [paragraph, setParagraph] =
    React.useState<DisplayParagraphSnippetFragment>();
  const [paragraphs, setParagraphs] = React.useState(
    !!mostRecentParagraph
      ? [...paragraphIds.slice(0, paragraphIds.length - 1), mostRecentParagraph]
      : [...paragraphIds]
  );
  const [selectedParagraphIndex, setSelectedParagraphIndex] = React.useState(
    paragraphIds.length - 1
  );

  const [previewEditProposalId, setPreviewEditProposalId] =
    React.useState<string>();
  const [showEditProposalCard, setShowEditProposalCard] = React.useState(false);

  const [getParagraph, { loading: queryLoading, data }] =
    useParagraphLazyQuery();

  /**
   * ----- Variables -----
   */

  const selectedParagraph = React.useMemo(() => {
    return paragraphs[selectedParagraphIndex];
  }, [paragraphs, selectedParagraphIndex]);

  const leftDisabled = selectedParagraphIndex === 0;
  const rightDisabled = selectedParagraphIndex === paragraphs.length - 1;
  const loading = queryLoading || typeof selectedParagraph === "string";

  /**
   * ----- Functions -----
   */

  const clearEditProposalPreview = React.useCallback(() => {
    setPreviewEditProposalId(undefined);
    if (onClearPreviewedProposal) onClearPreviewedProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (typeof selectedParagraph === "object") {
      setParagraph(selectedParagraph);
    } else {
      setParagraph(undefined);
      getParagraph({
        variables: {
          id: selectedParagraph,
        },
      });
    }
  }, [getParagraph, selectedParagraph]);

  React.useEffect(() => {
    if (!queryLoading && data) {
      setParagraph(data.paragraph);

      const paragraphsCopy = [...paragraphs];
      paragraphsCopy[selectedParagraphIndex] = data.paragraph;
      setParagraphs(paragraphsCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, queryLoading]);

  useDidMountEffect(() => {
    clearEditProposalPreview();
  }, [clearEditProposalPreview, selectedParagraphIndex]);

  React.useEffect(() => {
    setSelectedParagraphIndex(paragraphs.length - 1);
    if (previewEditProposal) {
      setPreviewEditProposalId(previewEditProposal);
    } else {
      setPreviewEditProposalId(undefined);
    }
  }, [paragraphs.length, previewEditProposal]);

  // update state if props update
  React.useEffect(() => {
    setParagraphs(
      !!mostRecentParagraph
        ? [
            ...paragraphIds.slice(0, paragraphIds.length - 1),
            mostRecentParagraph,
          ]
        : [...paragraphIds]
    );

    setSelectedParagraphIndex(paragraphIds.length - 1);
  }, [paragraphIds, mostRecentParagraph]);

  /**
   * ----- Rendering -----
   */

  const paragraphContent = React.useMemo(() => {
    if (!!paragraph) {
      if (previewEditProposalId) {
        return (
          <EditProposalPreview
            closePreview={() => clearEditProposalPreview()}
            editProposalId={previewEditProposalId}
          />
        );
      }

      return <Paragraph paragraph={paragraph} />;
    } else {
      return <Loading minH="10rem" />;
    }
  }, [clearEditProposalPreview, paragraph, previewEditProposalId]);

  const editProposalCard = React.useMemo(() => {
    if (showEditProposalCard && paragraph && paragraph.sourceEditProposal) {
      return (
        <ParagraphEditProposalCard
          paragraphEditProposalId={paragraph.sourceEditProposal._id}
          editProposalPreviewSelection={(proposalId) =>
            setPreviewEditProposalId(proposalId)
          }
          editProposalSelected={
            paragraph.sourceEditProposal._id === previewEditProposalId
          }
        />
      );
    }
  }, [paragraph, previewEditProposalId, showEditProposalCard]);

  return (
    <Box>
      {paragraphContent}
      <Box display="flex" flexDir="row" justifyContent="space-between">
        <IconButton
          aria-label="previous"
          icon={<FiChevronLeft />}
          isLoading={loading}
          isDisabled={leftDisabled}
          onClick={() => {
            if (!leftDisabled)
              setSelectedParagraphIndex(selectedParagraphIndex - 1);
          }}
        />
        <Box display="flex" flexDir="column">
          <Text
            color="gray.600"
            margin="auto"
            cursor="pointer"
            onClick={() => setShowEditProposalCard(!showEditProposalCard)}
          >
            Paragraph Version: {selectedParagraphIndex + 1}
          </Text>
          {editProposalCard}
        </Box>
        <IconButton
          aria-label="next"
          icon={<FiChevronRight />}
          isLoading={loading}
          isDisabled={rightDisabled}
          onClick={() => {
            if (!rightDisabled)
              setSelectedParagraphIndex(selectedParagraphIndex + 1);
          }}
        />
      </Box>
    </Box>
  );
};

export default Paragraphs;

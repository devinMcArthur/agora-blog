import { IconButton } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  DisplayParagraphSnippetFragment,
  useParagraphLazyQuery,
} from "../../../generated/graphql";
import EditProposalPreview from "../../Common/EditProposalPreview";
import Loading from "../../Common/Loading";
import Paragraph from "../../Common/Paragraph";
import ParagraphEditProposal from "../../Common/ParagraphEditProposal";

interface IParagraphs {
  mostRecentParagraph?: DisplayParagraphSnippetFragment;
  paragraphIds: string[];
}

const Paragraphs = ({ mostRecentParagraph, paragraphIds }: IParagraphs) => {
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

  React.useEffect(() => {
    setPreviewEditProposalId(undefined);
  }, [selectedParagraphIndex]);

  /**
   * ----- Rendering -----
   */

  const paragraphContent = React.useMemo(() => {
    if (!!paragraph) {
      if (previewEditProposalId) {
        return (
          <EditProposalPreview
            closePreview={() => setPreviewEditProposalId(undefined)}
            editProposalId={previewEditProposalId}
          />
        );
      }

      return <Paragraph paragraph={paragraph} />;
    } else {
      return <Loading minH="10rem" />;
    }
  }, [paragraph, previewEditProposalId]);

  console.log("paragraph", paragraph);

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
          <Text color="gray.600" margin="auto">
            Paragraph Version: {selectedParagraphIndex + 1}
          </Text>
          {paragraph && paragraph.sourceEditProposal && (
            <ParagraphEditProposal
              paragraphEditProposalId={paragraph.sourceEditProposal._id}
              editProposalPreviewSelection={(proposalId) =>
                setPreviewEditProposalId(proposalId)
              }
              editProposalSelected={
                paragraph.sourceEditProposal._id === previewEditProposalId
              }
            />
          )}
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

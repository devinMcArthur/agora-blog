import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { DisplayParagraphSnippetFragment } from "../../../generated/graphql";
import Paragraph from "../../Common/Paragraph";

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

  /**
   * ----- Variables -----
   */

  const selectedParagraph = React.useMemo(() => {
    return paragraphs[selectedParagraphIndex];
  }, [paragraphs, selectedParagraphIndex]);

  const leftDisabled = selectedParagraphIndex === 0;
  const rightDisabled = selectedParagraphIndex === paragraphs.length - 1;

  console.log(typeof selectedParagraph);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (typeof selectedParagraph === "object") {
      setParagraph(selectedParagraph);
    }
  }, [selectedParagraph]);

  return (
    <Box>
      <Box>
        <Button
          isDisabled={leftDisabled}
          onClick={() => {
            if (!leftDisabled)
              setSelectedParagraphIndex(selectedParagraphIndex - 1);
          }}
        >
          Left
        </Button>
        <Button
          isDisabled={rightDisabled}
          onClick={() => {
            if (!rightDisabled)
              setSelectedParagraphIndex(selectedParagraphIndex + 1);
          }}
        >
          Right
        </Button>
      </Box>
      {!!paragraph && <Paragraph paragraph={paragraph} />}
    </Box>
  );
};

export default Paragraphs;

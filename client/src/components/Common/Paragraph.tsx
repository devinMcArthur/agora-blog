import React from "react";

import { Box } from "@chakra-ui/layout";

import { DisplayParagraphSnippetFragment } from "../../generated/graphql";
import ParagraphStatement from "./ParagraphStatement";

interface IParagraph {
  paragraph: DisplayParagraphSnippetFragment;
}

const Paragraph = ({ paragraph }: IParagraph) => {
  const paragraphJSX = React.useMemo(() => {
    return paragraph.statements.map((statement, index) => {
      return (
        <ParagraphStatement
          paragraphStatement={statement}
          pageId={paragraph.page._id}
          key={index}
        />
      );
    });
  }, [paragraph.statements, paragraph.page]);

  return (
    <Box fisplay="flex" flexDir="column">
      {paragraphJSX}
    </Box>
  );
};

export default Paragraph;

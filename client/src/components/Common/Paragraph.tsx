import React from "react";

import { Box } from "@chakra-ui/layout";

import { DisplayParagraphSnippetFragment } from "../../generated/graphql";
import Statement from "../Statement";
import { useDrawer } from "../../contexts/Drawer";

interface IParagraph {
  paragraph: DisplayParagraphSnippetFragment;
}

const Paragraph = ({ paragraph }: IParagraph) => {
  const {
    state: { paragraphStatement },
    setParagraphStatement,
    clearParagraphStatement,
  } = useDrawer();

  const paragraphJSX = React.useMemo(() => {
    return paragraph.statements.map((statement, index) => {
      const selected =
        paragraphStatement?.statement._id === statement.statement._id;

      return (
        <Box
          key={index}
          display="flex"
          flexDir="row"
          my={2}
          pr={2}
          backgroundColor={selected ? "gray.200" : "gray.100"}
          borderRadius="0 1em 1em 0"
          cursor="pointer"
          onClick={() =>
            selected
              ? clearParagraphStatement()
              : setParagraphStatement(statement)
          }
        >
          <Box flexShrink={0} width="5px" backgroundColor="gray.600" mr={4} />
          <Box my={2}>
            <Statement
              statement={statement.statement}
              versionIndex={statement.versionIndex}
            />
          </Box>
        </Box>
      );
    });
  }, [
    paragraph.statements,
    paragraphStatement?.statement._id,
    setParagraphStatement,
    clearParagraphStatement,
  ]);

  return (
    <Box fisplay="flex" flexDir="column">
      {paragraphJSX}
    </Box>
  );
};

export default Paragraph;

import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { DisplayParagraphSnippetFragment } from "../../generated/graphql";

import Statement from "../Statement";

const Paragraph = (props: { paragraph: DisplayParagraphSnippetFragment }) => {
  const paragraphJSX = props.paragraph.statements.map((statement) => (
    <Box>
      <Text as="i" fontSize="sm" textDecoration="underline">
        {
          statement.versions[statement.versions.length - 1].questions[0]
            .question
        }
      </Text>
      <div style={{ textIndent: "1%", lineHeight: "2", marginBottom: "1em" }}>
        <Statement statement={statement} showSources={true} />
      </div>
    </Box>
  ));

  return <div>{paragraphJSX}</div>;
};

export default Paragraph;

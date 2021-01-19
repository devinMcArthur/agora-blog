import { Box, Text } from "@chakra-ui/react";
import React from "react";

import { DisplayParagraphSnippetFragment } from "../../generated/graphql";

import Statement from "../Statement";

const Paragraph = (props: { paragraph: DisplayParagraphSnippetFragment }) => {
  const paragraphJSX = props.paragraph.statements.map((statement) => {
    return (
      <Box>
        {statement.versions[statement.versions.length - 1].questions[0] ? (
          <Text as="i" fontSize="sm" borderBottom="1px solid lightgrey">
            {
              statement.versions[statement.versions.length - 1].questions[0]
                .question
            }
          </Text>
        ) : null}
        <div style={{ textIndent: "1%", lineHeight: "2", marginBottom: "1em" }}>
          <Statement statement={statement} showSources={true} />
        </div>
      </Box>
    );
  });

  return <div>{paragraphJSX}</div>;
};

export default Paragraph;

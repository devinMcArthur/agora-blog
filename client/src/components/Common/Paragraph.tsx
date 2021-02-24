import { Box } from "@chakra-ui/react";
import React from "react";

import { DisplayParagraphSnippetFragment } from "../../generated/graphql";

import Statement from "../Statement";

const Paragraph = (props: { paragraph: DisplayParagraphSnippetFragment }) => {
  const paragraphJSX = props.paragraph.statements.map((statement) => {
    return (
      <Box>
        <div style={{ lineHeight: "2", marginBottom: "1em" }}>
          <Statement statement={statement} showSources={true} showQuestions />
        </div>
      </Box>
    );
  });

  return <div>{paragraphJSX}</div>;
};

export default Paragraph;

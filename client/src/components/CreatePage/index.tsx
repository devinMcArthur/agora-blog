import React from "react";

import { Container, Heading } from "@chakra-ui/react";
import PageSearch from "../Common/PageSearch";
import { Box } from "@chakra-ui/layout";
import ParagraphForm from "../Common/ParagraphForm";
import { DisplayParagraphSnippetFragment } from "../../generated/graphql";

const CreatePage = () => {
  const [title, setTitle] = React.useState("");
  const [statements, setStatements] = React.useState<
    DisplayParagraphSnippetFragment["statements"]
  >([]);

  console.log("title", title);
  console.log("statements", statements);

  return (
    <Container minW="80%">
      <Heading>Create a new page</Heading>
      <Box
        m={2}
        border="1px solid black"
        borderColor="gray.800"
        borderRadius={3}
        p={4}
      >
        <Heading size="md">Title</Heading>
        <PageSearch
          value={title}
          onChange={(value) => setTitle(value)}
          pageSelected={() => {}}
          bgColor="gray.200"
          dropdownProps={{ backgroundColor: "gray.200" }}
        />
        <Heading size="md">Paragraph</Heading>
        <ParagraphForm
          onChange={(data) => setStatements(data.statements || [])}
        />
      </Box>
    </Container>
  );
};

export default CreatePage;

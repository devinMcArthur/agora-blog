import React from "react";

import { Container, Heading } from "@chakra-ui/react";
import PageSearch from "../Common/PageSearch";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import ParagraphForm from "../Common/ParagraphForm";
import { NewStatementData, useNewPageMutation } from "../../generated/graphql";
import { useHistory } from "react-router";
import ErrorMessage from "../Common/ErrorMessage";

const CreatePage = () => {
  const history = useHistory();

  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState<string>();

  const [statements, setStatements] = React.useState<NewStatementData[]>([]);
  const [paragraphError, setParagraphError] = React.useState<string>();

  const [generalError, setGeneralError] = React.useState<string>();

  const [createPage, { loading }] = useNewPageMutation();

  const handleSubmit = () => {
    errorCheck().then(() => {
      createPage({
        variables: {
          data: {
            title,
            paragraph: {
              statements,
            },
          },
        },
      })
        .then((result) => {
          history.push(`/p/${result.data?.newPage.slug}`);
        })
        .catch((err) => {
          console.warn(err);
          setGeneralError(err.message);
        });
    });
  };

  const errorCheck = () => {
    return new Promise<void>((resolve, reject) => {
      let isValid = true;
      if (!title || title === "") {
        setTitleError("must provide a title");
        isValid = false;
      }

      if (statements.length < 1) {
        setParagraphError("must provide at least one statement");
        isValid = false;
      }

      statements.forEach((statement) => {
        if (
          !statement.quotedStatement &&
          statement.stringArray.length === 1 &&
          (!statement.stringArray[0].string ||
            statement.stringArray[0].string === "") &&
          statement.stringArray[0].styles.length === 0
        ) {
          setParagraphError("cannot have blank statements");
          isValid = false;
        }
      });

      if (!isValid) reject();

      resolve();
    });
  };

  // Clear title error
  React.useEffect(() => {
    setTitleError(undefined);
  }, [title]);

  return (
    <Container minW="80%">
      <Box>
        <Heading>Create a new page</Heading>
        <Button isLoading={loading} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Box>
      <Box
        m={2}
        border="1px solid black"
        borderColor="gray.800"
        borderRadius={3}
        p={4}
      >
        {generalError && <ErrorMessage description={generalError} my={2} />}
        <Heading size="md">Title</Heading>
        <PageSearch
          value={title}
          onChange={(value) => setTitle(value)}
          pageSelected={() => {}}
          bgColor="gray.200"
          dropdownProps={{ backgroundColor: "gray.200" }}
          errorMessage={titleError}
        />
        <Heading size="md">Paragraph</Heading>
        {paragraphError && <ErrorMessage description={paragraphError} my={2} />}
        <ParagraphForm
          onChange={(data) => setStatements(data.statements || [])}
        />
      </Box>
    </Container>
  );
};

export default CreatePage;

import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import { NewStatementData, useNewPageMutation } from "../generated/graphql";
import { Box, Container, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import ErrorMessage from "../components/Common/ErrorMessage";
import PageSearch from "../components/Common/PageSearch";
import ParagraphForm from "../components/Common/ParagraphForm";
import { useAuth } from "../contexts/Auth";
import AccessDeniedPage from "../components/Common/AccessDeniedPage";

const CreatePage = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { user },
  } = useAuth();

  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState<string>();

  const [statements, setStatements] = React.useState<NewStatementData[]>([]);
  const [paragraphError, setParagraphError] = React.useState<string>();

  const [generalError, setGeneralError] = React.useState<string>();

  const [createPage, { loading }] = useNewPageMutation();

  /**
   * ----- Functions -----
   */

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
          router.push(`/p/${result.data?.newPage.slug}`);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
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

  /**
   * ----- Use-effects and other logic -----
   */

  // Clear title error
  React.useEffect(() => {
    setTitleError(undefined);
  }, [title]);

  /**
   * ----- Rendering -----
   */

  if (user === null) return <AccessDeniedPage />;

  return (
    <Container minW="80%">
      <Head>
        <title>Create Page</title>
        <meta name="description" content="Create a new page on Agora" />
      </Head>
      <Box display="flex" flexDir="row" justifyContent="space-between" py={2}>
        <Heading>Create a new page</Heading>
        <Button
          variant="outline"
          isLoading={loading}
          onClick={() => handleSubmit()}
          bgColor={"white"}
          my="auto"
        >
          Submit
        </Button>
      </Box>
      <Box m={2} p={4}>
        {generalError && <ErrorMessage description={generalError} my={2} />}
        <Heading size="md">Title</Heading>
        <PageSearch
          value={title}
          onChange={(value) => setTitle(value)}
          pageSelected={(value) => setTitle(value.title)}
          bgColor="gray.200"
          dropdownProps={{ backgroundColor: "gray.200" }}
          errorMessage={titleError}
        />
        <Heading size="md" py={4}>
          Paragraph
        </Heading>
        {paragraphError && <ErrorMessage description={paragraphError} my={2} />}
        <ParagraphForm
          onChange={(data) => setStatements(data.statements || [])}
        />
      </Box>
    </Container>
  );
};

export default CreatePage;

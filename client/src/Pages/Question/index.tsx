import * as React from "react";

import PageCard from "../../components/Common/PageCard";
import Loading from "../../components/Common/Loading";

import { useQuestionQuery } from "../../generated/graphql";
import { Container, Divider, Flex, Heading } from "@chakra-ui/react";
import setDocumentTitle from "../../utils/setDocumentTitle";

type Props = {
  match: any;
};

const Question = (props: Props) => {
  const { data, loading } = useQuestionQuery({
    variables: { id: props.match.params.questionID },
  });

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    setDocumentTitle(data?.question?.question);
  }, [data]);

  /**
   * ----- Rendering -----
   */

  let content = <Loading />;

  if (data?.question && !loading) {
    const { question } = data;
    const relatedPageList = data!.question.relatedPages.map(
      (relatedPage, index) => (
        <PageCard
          key={index}
          page={relatedPage}
          referenceObject={{
            type: "question",
            questionID: data!.question!._id,
          }}
        />
      )
    );

    content = (
      <Flex flexDirection="column">
        <Heading as="h5">{question.question}</Heading>
        <Divider />
        <Flex pt={2}>{relatedPageList}</Flex>
      </Flex>
    );
  }

  return (
    <Container minW="80%" p={4}>
      {content}
    </Container>
  );
};

export default Question;

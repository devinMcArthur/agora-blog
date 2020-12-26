import * as React from "react";

import PageCard from "../Common/PageCard";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import Loading from "../Common/Loading";

import { useQuestionQuery } from "../../generated/graphql";

type Props = {
  match: any;
};

const Question = (props: Props) => {
  const { data, loading } = useQuestionQuery({
    variables: { id: props.match.params.questionID },
  });

  let content = <Loading />;

  if (data?.question && !loading) {
    const relatedPageList = data!.question.relatedPages.map((relatedPage) => (
      <PageCard
        page={relatedPage}
        referenceObject={{ type: "question", questionID: data!.question!._id }}
      />
    ));

    content = (
      <Flex flexDirection="column">
        <h2>{data!.question.question}</h2>
        <Flex>{relatedPageList}</Flex>
      </Flex>
    );
  }

  return <Container>{content}</Container>;
};

export default Question;

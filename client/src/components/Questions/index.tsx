import React from "react";
import { useQuestionsQuery } from "../../generated/graphql";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import Loading from "../Common/Loading";
import QuestionCard from "../Common/QuestionCard";

const Questions = () => {
  const { data, loading } = useQuestionsQuery();

  let content = <Loading />;

  if (data?.questions && !loading) {
    const questionsJSX = data.questions.map((question) => (
      <QuestionCard question={question} />
    ));

    content = <Flex flexDirection="column">{questionsJSX}</Flex>;
  }

  return <Container layout="maxi">{content}</Container>;
};

export default Questions;

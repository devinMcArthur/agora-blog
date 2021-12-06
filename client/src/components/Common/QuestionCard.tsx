import * as React from "react";
import { Box, Tag } from "@chakra-ui/react";

import Card from "./Card";

import { QuestionCardSnippetFragment } from "../../generated/graphql";
import TextLink from "./TextLink";
import createLink from "../../utils/createLink";

interface IQuestionCard {
  question: QuestionCardSnippetFragment;
}

const QuestionCard = ({ question }: IQuestionCard) => {
  return (
    <Card
      heading={
        <TextLink link={createLink.questionLink(question.slug)} fontWeight="bold" color="black">
          {question.question}
        </TextLink>
      }
    >
      <Box pt={2}>
        <Tag>
          <b>Answers: {question.referencedCount || 0}</b>
        </Tag>
      </Box>
    </Card>
  );
};

export default QuestionCard;

import * as React from "react";
import { Box, Divider, Tag } from "@chakra-ui/react";

import Card from "./Card";

import { QuestionCardSnippetFragment } from "../../generated/graphql";
import TextLink from "./TextLink";

interface IQuestionCard {
  question: QuestionCardSnippetFragment;
}

const QuestionCard = ({ question }: IQuestionCard) => {
  return (
    <Card
      heading={
        <TextLink link={`/q/${question._id}`} fontWeight="bold" color="black">
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

import * as React from "react";
import { Divider, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import Card from "./Card";

import { QuestionCardSnippetFragment } from "../../generated/graphql";

type Props = {
  question: QuestionCardSnippetFragment;
};

type State = {};

class QuestionCard extends React.Component<Props, State> {
  render() {
    const { question } = this.props;

    return (
      <Card key={question._id.toString()}>
        <Link as={RouterLink} to={`/q/${question._id}`} fontWeight="bold">
          {question.question}
        </Link>
        <Divider />
        Answers: {question.referencedCount || 0}
      </Card>
    );
  }
}

export default QuestionCard;

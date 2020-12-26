import * as React from "react";
import { Link } from "react-router-dom";

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
        <Link to={`/q/${question._id}`} style={{ margin: "0" }}>
          <h4>{question.question}</h4>
        </Link>
      </Card>
    );
  }
}

export default QuestionCard;

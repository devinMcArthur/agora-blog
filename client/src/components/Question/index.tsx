import * as React from "react";
import { RouterProps } from "react-router";

import { QuestionPopulated } from "../../typescript/interfaces/documents/Question";
import PageCard from "../Common/PageCard";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import Loading from "../Common/Loading";
import QuestionService from "../../services/questionService";

type Props = {
  match: any;
};

type State = {
  question: QuestionPopulated | undefined;
};

class Question extends React.Component<Props & RouterProps, State> {
  state: State = {
    question: undefined,
  };

  componentDidMount() {
    QuestionService()
      .getQuestionByID(this.props.match.params.questionID)
      .then((question) => {
        this.setState((state) => ({
          ...state,
          question,
        }));
      });
  }

  componentDidUpdate(prevProps: Props & RouterProps) {
    if (
      prevProps.match.params.questionID !== this.props.match.params.questionID
    ) {
      QuestionService()
        .getQuestionByID(this.props.match.params.questionID)
        .then((question) => {
          this.setState((state) => ({
            ...state,
            question,
          }));
        });
    }
  }

  render() {
    const { question } = this.state;
    let content = <Loading />;

    if (question) {
      const relatedPageList = question.relatedPages.map((relatedPage) => (
        <PageCard
          page={relatedPage}
          referenceObject={{ type: "question", questionID: question._id }}
        />
      ));

      content = (
        <Flex flexDirection="column">
          <h2>{question.question}</h2>
          <Flex>{relatedPageList}</Flex>
        </Flex>
      );
    }

    return <Container>{content}</Container>;
  }
}

export default Question;

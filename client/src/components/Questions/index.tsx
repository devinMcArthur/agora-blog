import React from "react";
import QuestionService from "../../services/questionService";
import { QuestionPopulated } from "../../typescript/interfaces/documents/Question";
import Container from "../Common/Container";
import Flex from "../Common/Flex";
import QuestionCard from "../Common/QuestionCard";

type Props = {};

type State = {
  questions: QuestionPopulated[];
};

class Questions extends React.Component<Props, State> {
  state: State = {
    questions: [],
  };

  componentDidMount() {
    QuestionService()
      .getRootQuestions()
      .then((questions) => {
        this.setState((state) => ({
          ...state,
          questions,
        }));
      });
  }

  render() {
    const { questions } = this.state;

    const questionsJSX = questions.map((question) => (
      <QuestionCard question={question} />
    ));

    return (
      <Container layout="maxi">
        <Flex flexDirection="column">{questionsJSX}</Flex>
      </Container>
    );
  }
}

export default Questions;

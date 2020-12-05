import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import DocumentFunctions from "./functions";
import QuestionFunctions from "./functions/question";
import VariableFunctions from "./functions/variable";

const { PageFunctions } = DocumentFunctions;

const mock = new MockAdapter(axios);

mock.onGet("/page/root").reply(200, {
  pages: PageFunctions.getRootPages(),
});

mock.onGet("/page/slug/{{pageSlug}}").reply((config) => {
  const page = PageFunctions.findPageBySlug(config.params.pageSlug);

  if (page) {
    const populatedPage = PageFunctions.fullPopulatePage(page);

    return [
      200,
      {
        page: populatedPage,
      },
    ];
  } else {
    return [400];
  }
});

mock.onGet("/question/root").reply(200, {
  questions: QuestionFunctions.getRootQuestions(),
});

mock.onGet("/question/{{questionID}}").reply((config) => {
  const question = QuestionFunctions.findQuestion(config.params.questionID);

  if (question) {
    const populatedQuestion = QuestionFunctions.populateQuestion(question);

    return [
      200,
      {
        question: populatedQuestion,
      },
    ];
  } else {
    return [404];
  }
});

mock.onGet("/variable/{{variableID}}").reply((config) => {
  const variable = VariableFunctions.findVariable(config.params.variableID);

  if (variable) {
    const populatedVariable = VariableFunctions.fullPopulateVariable(variable);

    return [
      200,
      {
        variable: populatedVariable,
      },
    ];
  } else {
    return [404];
  }
});

export default axios;

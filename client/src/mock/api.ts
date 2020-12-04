import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import DocumentFunctions from "./functions";
import QuestionFunctions from "./functions/question";

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

export default axios;

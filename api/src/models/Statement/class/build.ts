import {
  StatementDocument,
  StatementModel,
  File,
  QuestionDocument,
  Question,
} from "@models";
import { IStatementBuildData, StyleTypes } from "@typescript/models/Statement";

const build = (Statement: StatementModel, data: IStatementBuildData) => {
  return new Promise<StatementDocument>(async (resolve, reject) => {
    try {
      const newQuestions: QuestionDocument[] = [];

      for (let i = 0; i < data.version.newQuestions.length; i++) {
        const newQuestion = await Question.build({
          question: data.version.newQuestions[i],
        });

        await newQuestion.save();

        newQuestions.push(newQuestion);
      }

      const versionStringArray = await Promise.all(
        data.version.stringArray.map(async (item) => {
          return {
            ...item,
            styles: await Promise.all(
              item.styles.map(async (style) => {
                let value = {};

                switch (style.type) {
                  case StyleTypes.image: {
                    value = {
                      image: {
                        caption: style.value?.image?.caption,
                        sourceUrl: style.value?.image?.sourceUrl,
                        file: (await File.build(style.value!.image!.file))._id,
                      },
                    };
                    break;
                  }
                  default: {
                    value = { ...style.value };
                  }
                }

                return {
                  type: style.type,
                  variant: style.variant,
                  value,
                };
              })
            ),
          };
        })
      );

      const statement = new Statement({
        page: data.page,
        originalAuthor: data.author,
        versions: [
          {
            ...data.version,
            questions: [
              ...data.version.questions,
              ...newQuestions.map((question) => question._id),
            ],
            stringArray: versionStringArray,
          },
        ],
      });

      await statement.validateDocument();

      resolve(statement);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};

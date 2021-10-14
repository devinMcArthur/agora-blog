import { Descendant } from "slate";
import {
  DisplayParagraphSnippetFragment,
  DisplayStatementSnippetFragment,
  DisplayStyleSnippetFragment,
  FullStringArraySnippetFragment,
} from "../../generated/graphql";
import {
  SlateMarks,
  CustomElements,
  QuoteElementType,
  StatementElementType,
  StyledText,
  VariableElementType,
} from "../../models/slate";
import replaceSpaces from "../../utils/replacesSpaces";

export const convertParagraphToSlate = (
  paragraph: DisplayParagraphSnippetFragment
): Descendant[] => {
  return paragraph.statements.map((statement, index) =>
    convertStatementToSlate(statement, index)
  );
};

export const convertStatementToSlate = (
  statement: DisplayStatementSnippetFragment,
  index: number
): CustomElements => {
  console.log("statement", statement);

  const children = statement.versions[0].stringArray.map((stringArray) =>
    convertStringArrayToSlate(stringArray)
  );

  /**
   * Add surrounding text if quote is alone in paragraph so user
   * can move caret to quote
   */
  if (
    children.length === 1 &&
    (children[0] as QuoteElementType).type === "quote"
  ) {
    children.push({ text: "" });
    children.unshift({ text: "" });
  }

  return {
    type: "statement",
    statementId: statement._id,
    index,
    questions: statement.versions[0].questions.map((question) => {
      return {
        _id: question._id,
        question: question.question,
      };
    }),
    newQuestions: [],
    children,
  };
};

export const convertStringArrayToSlate = (
  stringArray: FullStringArraySnippetFragment
): Descendant => {
  const styles = stringArray.styles.map((style) => style.type);

  // Variable Element
  if (styles.includes("variable")) {
    const style = stringArray.styles.find((style) => style.type === "variable");
    return {
      type: "variable",
      id: style?.value.variable?._id!,
      title: style?.value.variable?.title!,
      finalValue: style?.value.variable?.finalValue!,
      children: [{ text: style?.value.variable?.finalValue.toString()! }],
    };
  }

  // Quote Element
  if (styles.includes("quote")) {
    const style = stringArray.styles.find((style) => style.type === "quote");
    return {
      type: "quote",
      statementId: style?.value.statement?._id!,
      children: [{ text: "" }],
    };
  }

  // Image Element
  if (styles.includes("image")) {
    const style = stringArray.styles.find((style) => style.type === "image");
    return {
      type: "image",
      buffer: style!.value.image!.buffer,
      contentType: style!.value.image!.contentType,
      name: style!.value.image!.name,
      sourceURL: style!.value.image!.sourceURL,
      caption: style!.value.image!.caption,
      children: [{ text: "" }],
    };
  }

  const leaf: Descendant = {
    text: stringArray.string || "",
  };

  stringArray.styles.forEach((style) => {
    if (style.type === "variable" && style.value.variable) {
    }

    if (style.type === "bold") {
      leaf[SlateMarks.bold] = true;
    }

    if (
      style.type === "mention" &&
      style.variant === "internal" &&
      style.value.page
    ) {
      leaf[SlateMarks.internalMentionPage] = {
        id: style.value.page._id,
        title: style.value.page.title,
      };
    }

    if (
      style.type === "mention" &&
      style.variant === "external" &&
      style.value.url
    ) {
      leaf[SlateMarks.externalMentionUrl] = style.value.url;
    }
  });

  return leaf;
};

export const convertSlateParagraphToParagraph = (
  slateParagraph: Descendant[],
  originalParagraph: DisplayParagraphSnippetFragment
): DisplayParagraphSnippetFragment => {
  const statements: DisplayParagraphSnippetFragment["statements"] = [];

  for (const i in slateParagraph) {
    if (Object.prototype.hasOwnProperty.call(slateParagraph, i)) {
      const element: StatementElementType = slateParagraph[
        i
      ] as StatementElementType;

      const stringArray: FullStringArraySnippetFragment[] =
        element.children.map((child) => {
          const styles: DisplayStyleSnippetFragment[] = [];
          let text = "";

          // Child is StyledText
          if ((child as StyledText).text) {
            const item: StyledText = child as StyledText;
            text = item.text;

            if (item.bold) styles.push({ type: "bold", value: {} });

            if (item.italic) styles.push({ type: "italic", value: {} });

            if (item.externalMentionUrl)
              styles.push({
                type: "mention",
                variant: "external",
                value: { url: item.externalMentionUrl },
              });

            if (item.internalMentionPage)
              styles.push({
                type: "mention",
                variant: "internal",
                value: {
                  page: {
                    _id: item.internalMentionPage.id,
                    title: item.internalMentionPage.title,
                    slug: replaceSpaces(item.internalMentionPage.title),
                  },
                },
              });
          }

          // Child is variable
          if ((child as CustomElements).type === "variable") {
            const item: VariableElementType = child as VariableElementType;

            styles.push({
              type: "variable",
              value: {
                variable: {
                  _id: item.id,
                  finalValue: item.finalValue,
                  title: item.title,
                },
              },
            });

            text = item.children[0].text;
          }

          // Child is quote
          if ((child as CustomElements).type === "quote") {
            const item: QuoteElementType = child as QuoteElementType;

            styles.push({
              type: "quote",
              value: { statement: { _id: item.statementId } },
            });
          }

          return {
            string: text,
            styles,
          };
        });

      const statement: DisplayStatementSnippetFragment = {
        _id: element.statementId,
        versions: [
          {
            questions: element.questions.map((question) => {
              return {
                _id: question._id,
                question: question.question,
              };
            }),
            sources: { pages: [], urls: [] },
            stringArray,
          },
        ],
      };

      statements.push(statement);
    }
  }

  const paragraph: DisplayParagraphSnippetFragment = {
    page: originalParagraph.page,
    __typename: originalParagraph.__typename,
    statements,
  };

  return paragraph;
};

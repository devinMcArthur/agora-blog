import { Descendant } from "slate";
import {
  DisplayParagraphSnippetFragment,
  DisplayStatementSnippetFragment,
  FullStringArraySnippetFragment,
} from "../../generated/graphql";
import {
  SlateMarks,
  CustomElements,
  QuoteElementType,
} from "../../models/slate";

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

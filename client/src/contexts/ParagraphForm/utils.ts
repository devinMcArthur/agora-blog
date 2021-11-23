import { Descendant } from "slate";
import {
  DisplayParagraphSnippetFragment,
  DisplayStatementSnippetFragment,
  DisplayStyleSnippetFragment,
  FullStringArraySnippetFragment,
  NewStatementData,
  StringArrayData,
  StringArrayStyleData,
  StyleValueImageData,
} from "../../generated/graphql";
import {
  SlateMarks,
  CustomElements,
  QuoteElementType,
  StatementElementType,
  StyledText,
  VariableElementType,
  ImageElementType,
} from "../../models/slate";
import dataUrlToBlob from "../../utils/dataUrlToBlob";
import replaceSpaces from "../../utils/replacesSpaces";

export const convertParagraphToSlate = (
  paragraph: DisplayParagraphSnippetFragment
): Descendant[] => {
  return paragraph.statements.map((statement, index) =>
    convertStatementToSlate(statement.statement, index)
  );
};

export const convertStatementToSlate = (
  statement: DisplayStatementSnippetFragment,
  index: number
): CustomElements => {
  const currentVersion = statement.versions[statement.versions.length - 1];
  const children = currentVersion.stringArray.map((stringArray) =>
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

  let quotedStatementId;
  if (currentVersion.quotedStatement)
    quotedStatementId = currentVersion.quotedStatement._id;

  return {
    type: "statement",
    statementId: statement._id,
    index,
    quotedStatementId,
    questions: currentVersion.questions.map((question) => {
      return {
        _id: question._id,
        question: question.question,
      };
    }),
    newQuestions: [],
    children: children.length > 0 ? children : [{ text: "" }],
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
      buffer: style!.value.image!.file!.buffer,
      contentType: style!.value.image!.file!.mimetype,
      sourceUrl: style!.value.image!.sourceUrl,
      caption: style!.value.image!.caption,
      children: [{ text: "" }],
    };
  }

  const leaf: Descendant = {
    text: stringArray.string || "",
  };

  stringArray.styles.forEach((style) => {
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
  const paragraph: DisplayParagraphSnippetFragment = {
    _id: originalParagraph._id,
    page: originalParagraph.page,
    __typename: originalParagraph.__typename,
    statements: convertSlateParagraphToStatements(slateParagraph),
    editProposals: [],
  };

  return paragraph;
};

export const convertSlateParagraphToStatements = (
  slateParagraph: Descendant[]
) => {
  const statements: DisplayParagraphSnippetFragment["statements"] = [];

  for (const i in slateParagraph) {
    if (Object.prototype.hasOwnProperty.call(slateParagraph, i)) {
      const element: StatementElementType = slateParagraph[
        i
      ] as StatementElementType;

      let stringArray: FullStringArraySnippetFragment[] = [];
      if (!element.quotedStatementId)
        stringArray = element.children
          .map((child) => {
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

            if ((child as CustomElements).type === "image") {
              const item: ImageElementType = child as ImageElementType;

              styles.push({
                type: "image",
                value: {
                  image: {
                    ...item,
                    file: {
                      _id: "NEW-IMAGE",
                      buffer: item.buffer,
                      mimetype: item.contentType,
                    },
                  },
                },
              });
            }

            return {
              string: text,
              styles,
            };
          })
          .filter((item) => {
            if (item.string === "" && item.styles.length === 0) return false;
            else return true;
          });

      let quotedStatement;
      if (element.quotedStatementId)
        quotedStatement = { _id: element.quotedStatementId };

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
            quotedStatement,
            stringArray,
          },
        ],
      };

      statements.push({
        statement,
        versionIndex: 0,
      });
    }
  }

  return statements;
};

export const convertSlateParagraphToStatementData = (
  slateParagraph: Descendant[]
): NewStatementData[] => {
  const buildStatements: NewStatementData[] = [];

  for (const i in slateParagraph) {
    if (Object.prototype.hasOwnProperty.call(slateParagraph, i)) {
      const element: StatementElementType = slateParagraph[
        i
      ] as StatementElementType;

      const stringArray: StringArrayData[] = element.children.map((child) => {
        const styles: StringArrayStyleData[] = [];
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
                page: item.internalMentionPage.id,
              },
            });
        }

        // Child is variable
        if ((child as CustomElements).type === "variable") {
          const item: VariableElementType = child as VariableElementType;

          styles.push({
            type: "variable",
            value: {
              variable: item.id,
            },
          });

          text = item.children[0].text;
        }

        // Child is quote
        if ((child as CustomElements).type === "quote") {
          const item: QuoteElementType = child as QuoteElementType;

          styles.push({
            type: "quote",
            value: { statement: item.statementId },
          });
        }

        if ((child as CustomElements).type === "image") {
          const item: ImageElementType = child as ImageElementType;

          const image: StyleValueImageData = {
            caption: item.caption,
            sourceUrl: item.sourceUrl,
            file: new File([dataUrlToBlob(item.buffer)], `new-image-${i}`, {
              type: item.contentType,
            }),
          };

          styles.push({
            type: "image",
            value: {
              image,
            },
          });
        }

        return {
          string: text,
          styles,
        };
      });

      buildStatements.push({
        newQuestions: element.newQuestions.map((question) => question.question),
        questions: element.questions.map((question) => question._id),
        quotedStatement: element.quotedStatementId,
        stringArray: stringArray,
      });
    }
  }

  return buildStatements;
};

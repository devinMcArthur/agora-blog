import { Descendant } from "slate";
import {
  DisplayParagraphSnippetFragment,
  DisplayStatementSnippetFragment,
  FullStringArraySnippetFragment,
} from "../../generated/graphql";
import { SlateMarks, CustomElements } from "../../models/slate";

export const convertParagraphToSlate = (
  paragraph: DisplayParagraphSnippetFragment
): Descendant[] => {
  return paragraph.statements.map((statement) =>
    convertStatementToSlate(statement)
  );
};

export const convertStatementToSlate = (
  statement: DisplayStatementSnippetFragment
): CustomElements => {
  return {
    type: "paragraph",
    children: statement.versions[0].stringArray.map((stringArray) =>
      convertStringArrayToSlate(stringArray)
    ),
  };
};

export const convertStringArrayToSlate = (
  stringArray: FullStringArraySnippetFragment
): Descendant => {
  const styles = stringArray.styles.map((style) => style.type);

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

    if (style.type === "quote" && style.value.statement) {
      leaf[SlateMarks.quoteStatementId] = style.value.statement._id;
      leaf.text = "quote";
    }
  });

  return leaf;
};

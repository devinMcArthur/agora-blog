import { Descendant } from "slate";
import {
  DisplayParagraphSnippetFragment,
  DisplayStatementSnippetFragment,
  FullStringArraySnippetFragment,
} from "../../generated/graphql";
import { SlateLeaf, SlateStatementElement } from "../../models/slate";

export const convertParagraphToSlate = (
  paragraph: DisplayParagraphSnippetFragment
): Descendant[] => {
  return paragraph.statements.map((statement) =>
    convertStatementToSlate(statement)
  );
};

export const convertStatementToSlate = (
  statement: DisplayStatementSnippetFragment
): SlateStatementElement => {
  return {
    children: statement.versions[0].stringArray.map((stringArray) =>
      convertStringArrayToSlate(stringArray)
    ),
  };
};

export const convertStringArrayToSlate = (
  stringArray: FullStringArraySnippetFragment
): SlateLeaf => {
  const leaf: SlateLeaf = {
    text: stringArray.string || "",
  };

  stringArray.styles.forEach((style) => {
    if (style.type === "bold") {
      leaf.bold = true;
    }

    if (
      style.type === "mention" &&
      style.variant === "internal" &&
      style.value.page
    ) {
      leaf.internalMentionPageId = style.value.page._id;
    }

    if (
      style.type === "mention" &&
      style.variant === "external" &&
      style.value.url
    ) {
      leaf.externalMentionUrl = style.value.url;
    }

    if (style.type === "quote" && style.value.statement) {
      leaf.quoteStatementId = style.value.statement._id;
      leaf.text = "quote";
    }

    if (style.type === "variable" && style.value.variable) {
      leaf.variableId = style.value.variable._id;
      leaf.text = style.value.variable.finalValue.toString();
    }
  });

  return leaf;
};

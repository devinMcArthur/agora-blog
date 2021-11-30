import * as React from "react";
import { Box } from "@chakra-ui/react";

import Card from "./Card";

import ParagraphService from "../../services/Paragraph";
import { PageCardSnippetFragment } from "../../generated/graphql";
import Statement from "../Statement";
import TextLink from "./TextLink";

type ReferenceObject =
  | {
      type: "page";
      pageID: string;
    }
  | {
      type: "question";
      questionID: string;
    }
  | { type: "variable"; variableID: string };

interface IPageCard {
  page: PageCardSnippetFragment;
  referenceObject?: ReferenceObject;
}

const PageCard = ({ page, referenceObject }: IPageCard) => {
  // Determine which sentence to show
  let statement = page.currentParagraph.statements[0].statement;
  if (referenceObject) {
    let referenceSentence;
    switch (referenceObject.type) {
      case "page":
        referenceSentence = ParagraphService().findSentenceWithPageReference(
          page.currentParagraph,
          referenceObject.pageID
        );
        break;
      case "question":
        referenceSentence =
          ParagraphService().findSentenceWithQuestionReference(
            page.currentParagraph,
            referenceObject.questionID
          );
        break;
      case "variable":
        referenceSentence =
          ParagraphService().findSentenceWithVariableReference(
            page.currentParagraph,
            referenceObject.variableID
          );
        break;
      default:
        break;
    }
    if (referenceSentence) statement = referenceSentence.statement;
  }

  return (
    <Card
      key={page._id}
      heading={
        <TextLink
          color="black"
          link={`/p/${page.slug}`}
          fontWeight="bold"
          fontSize="lg"
          margin={0}
        >
          {page.title}
        </TextLink>
      }
    >
      <Box mt={2}>
        <Statement statement={statement} />
      </Box>
    </Card>
  );
};

export default PageCard;

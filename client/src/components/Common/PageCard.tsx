import * as React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Types } from "mongoose";

import Card from "./Card";

import ParagraphService from "../../services/paragraphService";
import { PageCardSnippetFragment } from "../../generated/graphql";
import Statement from "../Statement";

type ReferenceObject =
  | {
      type: "page";
      pageID: Types.ObjectId | string;
    }
  | {
      type: "question";
      questionID: Types.ObjectId | string;
    }
  | { type: "variable"; variableID: Types.ObjectId | string };

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
        <Link
          as={RouterLink}
          to={`/p/${page.slug}`}
          style={{ margin: "0" }}
          fontWeight="bold"
          fontSize="lg"
        >
          {page.title}
        </Link>
      }
    >
      <Box mt={2}>
        <Statement statement={statement} />
      </Box>
    </Card>
  );
};

export default PageCard;

import * as React from "react";
import { Divider, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Types } from "mongoose";

import Card from "./Card";

import ParagraphService from "../../services/paragraphService";
import StatementService from "../../services/statementService";
import { PageCardSnippetFragment } from "../../generated/graphql";

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

type PageContainerProps = {
  page: PageCardSnippetFragment;
  referenceObject?: ReferenceObject;
};

type PageContainerState = {};

class PageContainer extends React.Component<
  PageContainerProps,
  PageContainerState
> {
  render() {
    const { page, referenceObject } = this.props;

    // Determine which sentence to show
    let statement = page.currentParagraph.statements[0];
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
          referenceSentence = ParagraphService().findSentenceWithQuestionReference(
            page.currentParagraph,
            referenceObject.questionID
          );
          break;
        case "variable":
          referenceSentence = ParagraphService().findSentenceWithVariableReference(
            page.currentParagraph,
            referenceObject.variableID
          );
          break;
        default:
          break;
      }
      if (referenceSentence) statement = referenceSentence;
    }

    return (
      <Card key={page._id.toString()}>
        <Link
          as={RouterLink}
          to={`/p/${page.slug}`}
          style={{ margin: "0" }}
          fontWeight="bold"
          fontSize="lg"
        >
          {page.title}
        </Link>
        <Divider />
        {StatementService().translateStatementToJSX(statement)}
      </Card>
    );
  }
}

export default PageContainer;

import * as React from "react";
import { Link } from "react-router-dom";
import { Types } from "mongoose";

import Card from "./Card";

import { PagePopulated } from "../../typescript/interfaces/documents/Page";

import ParagraphService from "../../services/paragraphService";
import SentenceService from "../../services/sentenceService";

type ReferenceObject =
  | {
      type: "page";
      pageID: Types.ObjectId;
    }
  | {
      type: "question";
      questionID: Types.ObjectId;
    }
  | { type: "variable"; variableID: Types.ObjectId };

type PageContainerProps = {
  page: PagePopulated;
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
    let sentence = page.currentParagraph.sentences[0];
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
      if (referenceSentence) sentence = referenceSentence;
    }

    return (
      <Card key={page._id.toString()}>
        <Link to={`/p/${page.slug}`} style={{ margin: "0" }}>
          <h4>{page.title}</h4>
        </Link>
        {SentenceService().translateSentenceToJSX(sentence)}
      </Card>
    );
  }
}

export default PageContainer;

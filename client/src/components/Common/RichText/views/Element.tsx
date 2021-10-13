import React from "react";

import { Editor } from "slate";
import { RenderElementProps } from "slate-react";
import VariableElement from "./VariableElement";
import QuoteElement from "./QuoteElement";
import StatementElement from "./StatementElement";
import { StatementElementType } from "../../../../models/slate";

interface IElement extends RenderElementProps {
  editor: Editor;
}

const Element = (props: IElement) => {
  switch (props.element.type) {
    case "variable": {
      return <VariableElement {...props} />;
    }
    case "quote": {
      return <QuoteElement {...props} />;
    }
    case "statement": {
      return (
        <StatementElement
          {...props}
          editor={props.editor}
          element={props.element as StatementElementType}
        />
      );
    }
  }
};

export default Element;

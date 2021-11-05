import React from "react";

import RichTextForm from "./Form";
import { RichTextProvider } from "../../../contexts/RichText";
import { Descendant } from "slate";

export interface IRichText {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  pageId?: string;
  submitLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const RichText = (props: IRichText) => {
  return (
    <RichTextProvider>
      <RichTextForm {...props} />
    </RichTextProvider>
  );
};

export default RichText;

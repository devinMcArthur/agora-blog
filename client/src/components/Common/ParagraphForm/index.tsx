import React from "react";
import {
  IParagraphFormProvider,
  ParagraphFormProvider,
} from "../../../contexts/ParagraphForm";
import Container from "./Container";

interface IParagraphForm {
  pageId?: string;
  onChange?: IParagraphFormProvider["onChange"];
}

const ParagraphForm: React.FC<IParagraphForm> = ({ pageId, onChange }) => {
  return (
    <ParagraphFormProvider pageId={pageId} onChange={onChange}>
      <Container />
    </ParagraphFormProvider>
  );
};

export default ParagraphForm;

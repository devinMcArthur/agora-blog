import React from "react";
import { ParagraphFormProvider } from "../../../contexts/ParagraphForm";
import Container from "./Container";

interface IParagraphForm {
  pageId: string;
}

const ParagraphForm: React.FC<IParagraphForm> = ({ pageId }) => {
  return (
    <ParagraphFormProvider pageId={pageId}>
      <Container />
    </ParagraphFormProvider>
  );
};

export default ParagraphForm;

import React from "react";
import {
  IParagraphFormProvider,
  ParagraphFormProvider,
} from "../../../contexts/ParagraphForm";
import Container, { IParagraphFormContainer } from "./Container";

interface IParagraphForm {
  pageId?: string;
  onChange?: IParagraphFormProvider["onChange"];
  onCancel?: () => void;
  onSubmit?: IParagraphFormContainer["onSubmit"];
}

const ParagraphForm: React.FC<IParagraphForm> = ({
  pageId,
  onChange,
  onCancel,
  onSubmit,
}) => {
  return (
    <ParagraphFormProvider pageId={pageId} onChange={onChange}>
      <Container onCancel={onCancel} onSubmit={onSubmit} />
    </ParagraphFormProvider>
  );
};

export default ParagraphForm;

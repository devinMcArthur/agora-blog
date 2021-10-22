import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Textarea, TextareaProps } from "@chakra-ui/textarea";
import React from "react";

interface ITextArea extends TextareaProps {
  label?: string;
}

const TextArea = ({ label, ...props }: ITextArea) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea {...props} />
    </FormControl>
  );
};

export default TextArea;

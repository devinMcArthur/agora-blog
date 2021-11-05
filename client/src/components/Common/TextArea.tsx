import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Textarea, TextareaProps } from "@chakra-ui/textarea";
import React from "react";

interface ITextArea extends TextareaProps {
  label?: string;
  errorMessage?: string;
}

const TextArea = ({ label, errorMessage, ...props }: ITextArea) => {
  return (
    <FormControl isInvalid={!!errorMessage}>
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea {...props} />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default TextArea;

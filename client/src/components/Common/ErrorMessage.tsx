import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import React from "react";

interface IErrorMessage {
  title?: string;
  description?: string;
}

const ErrorMessage = ({
  description = "Something went wrong, please contact support",
  title = "Error!",
}: IErrorMessage) => {
  return (
    <Alert status="error" variant="left-accent">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorMessage;

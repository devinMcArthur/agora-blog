import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/input";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";

export interface ITextField extends InputProps {
  label?: string;
  errorMessage?: string;
  inputLeftAddon?: React.ReactNode;
  inputRightAddon?: React.ReactNode;
  inputLeftElement?: React.ReactNode;
  inputRightElement?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, ITextField>(
  (
    {
      label,
      errorMessage,
      inputLeftAddon,
      inputLeftElement,
      inputRightAddon,
      inputRightElement,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl isInvalid={!!errorMessage}>
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          {inputLeftElement && <InputLeftElement children={inputLeftElement} />}
          {inputLeftAddon && <InputLeftAddon children={inputLeftAddon} />}
          <Input ref={ref} {...props} />
          {inputRightElement && (
            <InputRightElement children={inputRightElement} />
          )}
          {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
        </InputGroup>
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export default TextField;

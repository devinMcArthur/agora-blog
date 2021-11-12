import React from "react";
import {
  Input,
  InputElementProps,
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
  inputRightElementProps?: InputElementProps;
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
      inputRightElementProps,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl isInvalid={!!errorMessage} margin="auto">
        {label && <FormLabel>{label}</FormLabel>}
        <InputGroup>
          {inputLeftElement && (
            <InputLeftElement h="auto" children={inputLeftElement} />
          )}
          {inputLeftAddon && <InputLeftAddon children={inputLeftAddon} />}
          <Input ref={ref} {...props} />
          {inputRightElement && (
            <InputRightElement
              h="auto"
              py="auto"
              children={inputRightElement}
              {...inputRightElementProps}
            />
          )}
          {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
        </InputGroup>
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  }
);

export default TextField;

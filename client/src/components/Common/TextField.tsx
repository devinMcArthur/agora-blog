import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/input";

export interface ITextField extends InputProps {
  inputLeftAddon?: React.ReactNode;
  inputRightAddon?: React.ReactNode;
  inputRightElement?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, ITextField>(
  ({ inputLeftAddon, inputRightAddon, inputRightElement, ...props }, ref) => {
    return (
      <InputGroup>
        {inputLeftAddon && <InputLeftAddon children={inputLeftAddon} />}
        <Input ref={ref} {...props} />
        {inputRightElement && (
          <InputRightElement children={inputRightElement} />
        )}
        {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
      </InputGroup>
    );
  }
);

export default TextField;

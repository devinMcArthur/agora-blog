import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputProps,
  InputRightAddon,
} from "@chakra-ui/input";

interface ITextField extends InputProps {
  inputLeftAddon?: React.ReactNode;
  inputRightAddon?: React.ReactNode;
}

const TextField = ({
  inputLeftAddon,
  inputRightAddon,
  ...props
}: ITextField) => {
  return (
    <InputGroup>
      {inputLeftAddon && <InputLeftAddon children={inputLeftAddon} />}
      <Input {...props} />
      {inputRightAddon && <InputRightAddon children={inputRightAddon} />}
    </InputGroup>
  );
};

export default TextField;

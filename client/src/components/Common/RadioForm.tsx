import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup, RadioGroupProps } from "@chakra-ui/radio";
import React from "react";

interface IRadioForm extends Omit<RadioGroupProps, "children"> {
  options: { label: string; value: string }[];
  label?: string;
  helperText?: string;
}

const RadioForm = ({
  options,
  label,
  helperText,
  ...radioGroupProps
}: IRadioForm) => {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...radioGroupProps}>
        <HStack spacing={1}>
          {options.map((option) => (
            <Radio value={option.value}>{option.label}</Radio>
          ))}
        </HStack>
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioForm;

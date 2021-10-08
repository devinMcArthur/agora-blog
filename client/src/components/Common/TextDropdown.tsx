import { useOutsideClick } from "@chakra-ui/hooks";
import { Box, Stack } from "@chakra-ui/layout";
import React from "react";
import TextField, { ITextField } from "./TextField";

interface ITextDropdown<T> extends ITextField {
  options?: { value: string; label: string; extraData?: T }[];
  onOptionSelection: (
    choice: { value: string; label: string },
    extraData?: T
  ) => void;
  containerId?: string;
}

const TextDropdown: React.FC<ITextDropdown<any>> = ({
  options,
  onOptionSelection,
  containerId,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [dropdown, setDropdown] = React.useState(false);

  /**
   * ----- Use-effects and other logic -----
   */

  useOutsideClick({
    ref: inputRef,
    handler: () => setDropdown(false),
  });

  let dropdownJSX;
  if (dropdown && options && options.length > 0) {
    dropdownJSX = (
      <Stack
        borderRadius="0 0 0.375rem 0.375rem"
        position="absolute"
        top="2.375rem"
        border="1px solid"
        borderColor="inherit"
        borderTop="none"
        paddingTop={2}
        zIndex={9999}
        backgroundColor="white"
        width="100%"
      >
        {options.map((option, index) => (
          <Box
            as="span"
            cursor="pointer"
            _hover={{ fontWeight: "bold" }}
            padding={1}
            paddingLeft="1rem"
            onClick={() => {
              setDropdown(false);
              onOptionSelection(option, option.extraData);
            }}
            key={index}
          >
            {option.label}
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <div ref={inputRef} style={{ position: "relative" }} id={containerId}>
      <TextField onFocus={() => setDropdown(true)} {...props} />
      {dropdownJSX}
    </div>
  );
};

export default TextDropdown;

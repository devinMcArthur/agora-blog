import { useOutsideClick } from "@chakra-ui/hooks";
import { Box, Stack, StackProps } from "@chakra-ui/layout";
import React from "react";
import TextField, { ITextField } from "./TextField";

export interface IOptions<ExtraData> {
  value: string;
  label: string;
  extraData?: ExtraData;
}

interface ITextDropdown<ExtraData> extends ITextField {
  options?: IOptions<ExtraData>[];
  onOptionSelection: (
    choice: { value: string; label: string },
    extraData?: ExtraData
  ) => void;
  containerId?: string;
  dropdownProps?: StackProps;
  selectOptionsWithEnter?: boolean;
}

const TextDropdown = <ExtraData extends object>({
  options,
  onOptionSelection,
  containerId,
  dropdownProps,
  selectOptionsWithEnter = false,
  ...props
}: ITextDropdown<ExtraData>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [dropdown, setDropdown] = React.useState(false);

  const [selectedIndex, setSelectedIndex] = React.useState<number>();

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (options) {
      switch (e.key) {
        case "ArrowDown": {
          if (selectedIndex === undefined) setSelectedIndex(0);
          else if (selectedIndex !== options.length - 1)
            setSelectedIndex(selectedIndex + 1);

          break;
        }
        case "ArrowUp": {
          if (selectedIndex !== undefined) {
            if (selectedIndex === 0) {
              e.preventDefault();
              setSelectedIndex(undefined);
            } else setSelectedIndex(selectedIndex - 1);
          }

          break;
        }
        case "Enter": {
          if (selectOptionsWithEnter) {
            e.preventDefault();

            if (selectedIndex !== undefined)
              onOptionSelection(
                options[selectedIndex],
                options[selectedIndex].extraData
              );
          }
        }
      }
    }
  };

  /**
   * ----- Use-effects and other logic -----
   */

  useOutsideClick({
    ref: inputRef,
    handler: () => setDropdown(false),
  });

  React.useEffect(() => {
    setSelectedIndex(undefined);
  }, [options]);

  let dropdownJSX;
  if (dropdown && options && options.length > 0) {
    dropdownJSX = (
      <Box
        borderRadius="0 0 0.375rem 0.375rem"
        position="absolute"
        top="2.2rem"
        border="1px solid"
        borderColor="inherit"
        borderTop="none"
        paddingTop={2}
        zIndex={9999}
        backgroundColor="white"
        width="100%"
        {...dropdownProps}
      >
        <Box h="1px" w="95%" backgroundColor="gray.400" mx="auto" mb={2}></Box>
        <Stack>
          {options.map((option, index) => (
            <Box
              as="span"
              cursor="pointer"
              onMouseOver={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(undefined)}
              padding={1}
              paddingLeft="1rem"
              onClick={() => {
                setDropdown(false);
                onOptionSelection(option, option.extraData);
              }}
              key={index}
              fontWeight={selectedIndex === index ? "bold" : ""}
            >
              {option.label}
            </Box>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <div ref={inputRef} style={{ position: "relative" }} id={containerId}>
      <TextField
        onFocus={() => setDropdown(true)}
        onKeyDown={handleKeyDown}
        {...props}
      />
      {dropdownJSX}
    </div>
  );
};

export default TextDropdown;

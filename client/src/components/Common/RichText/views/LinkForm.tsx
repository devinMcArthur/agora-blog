import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import React from "react";
import { FiX } from "react-icons/fi";
import PageSearch from "../../PageSearch";

interface ILinkForm {
  handleSubmit: (value: string) => void;
  pageSelect: (page: { id: string; title: string }) => void;
  isInvalid?: boolean;
  defaultValue?: string;
  markActive: boolean;
  removeMark: () => void;
}

const LinkForm: React.FC<ILinkForm> = ({
  handleSubmit,
  pageSelect,
  isInvalid,
  defaultValue,
  markActive,
  removeMark,
}) => {
  return (
    <Box display="flex" flexDirection="row">
      <PageSearch
        pageSelected={pageSelect}
        handleSubmit={handleSubmit}
        backgroundColor="white"
        placeholder="enter url or page"
        isInvalid={isInvalid}
        defaultValue={defaultValue}
        _focus={{
          outline: "none",
        }}
        id="link-form"
      />
      {markActive && (
        <IconButton
          padding="auto"
          icon={<FiX />}
          aria-label="Delete"
          backgroundColor="inherit"
          variant="outline"
          onClick={removeMark}
          _hover={{ backgroundColor: "inherit" }}
        />
      )}
    </Box>
  );
};

export default LinkForm;

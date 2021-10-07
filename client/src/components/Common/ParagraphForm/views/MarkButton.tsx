import React from "react";

import { Button } from "@chakra-ui/button";
import { Editor } from "slate";
import { SlateMarks, SlateStyleTypes } from "../../../../models/slate";
import { CustomEditor } from "../utils";

import { FaBold, FaLink, FaItalic } from "react-icons/fa";
import { FiBold, FiLink, FiItalic } from "react-icons/fi";
import { Box } from "@chakra-ui/react";

interface IMarkButton {
  editor: Editor;
  type: SlateStyleTypes;
  toggleLinkForm?: () => void;
}

const MarkButton: React.FC<IMarkButton> = ({
  editor,
  type,
  toggleLinkForm,
}) => {
  const getButtonParameters = (
    type: SlateStyleTypes
  ): { label: React.ReactNode; onClick: () => void } => {
    switch (type) {
      case SlateStyleTypes.bold: {
        const isActive = CustomEditor.isMarkActive(editor, SlateMarks.bold);
        return {
          label: isActive ? <FaBold /> : <FiBold />,
          onClick: () => CustomEditor.toggleBold(editor),
        };
      }
      case SlateStyleTypes.italic: {
        const isActive = CustomEditor.isMarkActive(editor, SlateMarks.italic);
        return {
          label: isActive ? <FaItalic /> : <FiItalic />,
          onClick: () => CustomEditor.toggleItalic(editor),
        };
      }
      case SlateStyleTypes.link: {
        const isActive =
          CustomEditor.isMarkActive(editor, SlateMarks.externalMentionUrl) ||
          CustomEditor.isMarkActive(editor, SlateMarks.internalMentionPageId);

        return {
          label: isActive ? <FaLink /> : <FiLink />,
          onClick: () => {
            if (isActive) {
              CustomEditor.removeLink(editor);
            } else {
              if (toggleLinkForm) toggleLinkForm();
            }
          },
        };
      }
      default: {
        return {
          label: "invalid",
          onClick: () => null,
        };
      }
    }
  };

  const { label, onClick } = getButtonParameters(type);

  return (
    <Box>
      <Button
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
        margin={1}
      >
        {label}
      </Button>
    </Box>
  );
};

export default MarkButton;

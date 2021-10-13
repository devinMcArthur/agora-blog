import React from "react";

import { Button } from "@chakra-ui/button";
import { Editor } from "slate";
import {
  StyledText,
  SlateMarks,
  SlateStyleTypes,
} from "../../../../models/slate";
import { CustomEditor } from "../utils";

import { FaBold, FaLink, FaItalic } from "react-icons/fa";
import { FiBold, FiLink, FiItalic, FiAnchor, FiEdit3 } from "react-icons/fi";
import { Box } from "@chakra-ui/react";

interface IMarkButton {
  editor: Editor;
  type: SlateStyleTypes;
  toggleLinkForm?: (marks?: Omit<StyledText, "text"> | null) => void;
  toggleVariableForm?: () => void;
  toggleQuoteForm?: () => void;
}

const MarkButton: React.FC<IMarkButton> = ({
  editor,
  type,
  toggleLinkForm,
  toggleVariableForm,
  toggleQuoteForm,
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
          CustomEditor.isMarkActive(editor, SlateMarks.internalMentionPage);

        return {
          label: isActive ? <FaLink /> : <FiLink />,
          onClick: () => {
            if (toggleLinkForm) toggleLinkForm(CustomEditor.getMarks(editor));
          },
        };
      }
      case SlateStyleTypes.variable: {
        return {
          label: <FiAnchor />,
          onClick: () => {
            if (toggleVariableForm) toggleVariableForm();
          },
        };
      }
      case SlateStyleTypes.quote: {
        return {
          label: <FiEdit3 />,
          onClick: () => {
            if (toggleQuoteForm) toggleQuoteForm();
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

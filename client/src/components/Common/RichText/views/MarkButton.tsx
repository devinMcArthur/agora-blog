import React from "react";

import { Button, ButtonProps } from "@chakra-ui/button";
import { Editor } from "slate";
import {
  StyledText,
  SlateMarks,
  SlateStyleTypes,
} from "../../../../models/slate";
import { CustomEditor } from "../utils";

import { FaBold, FaLink, FaItalic } from "react-icons/fa";
import {
  FiBold,
  FiLink,
  FiItalic,
  FiAnchor,
  FiEdit3,
  FiCamera,
} from "react-icons/fi";
import { Tooltip } from "@chakra-ui/react";

interface IMarkButton extends Omit<ButtonProps, "styleType"> {
  editor: Editor;
  styleType: SlateStyleTypes;
  requireSelection?: boolean;
  toggleLinkForm?: (marks?: Omit<StyledText, "text"> | null) => void;
  toggleVariableForm?: () => void;
  toggleQuoteForm?: () => void;
  toggleImageForm?: () => void;
}

const MarkButton: React.FC<IMarkButton> = ({
  editor,
  styleType: type,
  requireSelection,
  toggleLinkForm,
  toggleVariableForm,
  toggleQuoteForm,
  toggleImageForm,
  ...props
}) => {
  const getButtonParameters = (
    type: SlateStyleTypes
  ): { label: React.ReactNode; onClick: () => void; tooltip: string } => {
    switch (type) {
      case SlateStyleTypes.bold: {
        const isActive = CustomEditor.isMarkActive(editor, SlateMarks.bold);
        return {
          tooltip: "Bold",
          label: isActive ? <FaBold /> : <FiBold />,
          onClick: () => CustomEditor.toggleBold(editor),
        };
      }
      case SlateStyleTypes.italic: {
        const isActive = CustomEditor.isMarkActive(editor, SlateMarks.italic);
        return {
          tooltip: "Italic",
          label: isActive ? <FaItalic /> : <FiItalic />,
          onClick: () => CustomEditor.toggleItalic(editor),
        };
      }
      case SlateStyleTypes.link: {
        const isActive =
          CustomEditor.isMarkActive(editor, SlateMarks.externalMentionUrl) ||
          CustomEditor.isMarkActive(editor, SlateMarks.internalMentionPage);

        return {
          tooltip: "Link",
          label: isActive ? <FaLink /> : <FiLink />,
          onClick: () => {
            if (toggleLinkForm) toggleLinkForm(CustomEditor.getMarks(editor));
          },
        };
      }
      case SlateStyleTypes.variable: {
        return {
          tooltip: "Variable",
          label: <FiAnchor />,
          onClick: () => {
            if (toggleVariableForm) toggleVariableForm();
          },
        };
      }
      case SlateStyleTypes.quote: {
        return {
          tooltip: "Quote",
          label: <FiEdit3 />,
          onClick: () => {
            if (toggleQuoteForm) toggleQuoteForm();
          },
        };
      }
      case SlateStyleTypes.image: {
        return {
          tooltip: "Image",
          label: <FiCamera />,
          onClick: () => {
            if (toggleImageForm) toggleImageForm();
          },
        };
      }
      default: {
        return {
          label: "invalid",
          tooltip: "invalid",
          onClick: () => null,
        };
      }
    }
  };

  const { label, tooltip, onClick } = getButtonParameters(type);

  return (
    <Tooltip label={tooltip}>
      <Button
        backgroundColor="white"
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
        margin={1}
        isDisabled={requireSelection && !editor.selection}
        {...props}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

export default MarkButton;

import { Box } from "@chakra-ui/react";
import React from "react";
import { Editor, Range } from "slate";
import { ReactEditor } from "slate-react";
import { SlateStyleTypes } from "../../../../models/slate";
import MarkButton from "./MarkButton";
import Portal from "./Portal";

interface IHoveringMenu {
  editor: Editor;
  toggleLinkMenu: () => void;
}

const HoveringMenu = ({ editor, toggleLinkMenu }: IHoveringMenu) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  });

  return (
    <Portal>
      <Box
        ref={ref}
        position="absolute"
        zIndex={9999}
        top="-10000px"
        left="-10000px"
        opacity={0}
        transition="opacity 0.75s"
      >
        <Box
          display="flex"
          flexDir="row"
          backgroundColor="gray.200"
          borderRadius={4}
        >
          <MarkButton
            size="sm"
            editor={editor}
            styleType={SlateStyleTypes.bold}
          />
          <MarkButton
            size="sm"
            editor={editor}
            styleType={SlateStyleTypes.italic}
          />
          <MarkButton
            size="sm"
            editor={editor}
            styleType={SlateStyleTypes.link}
            toggleLinkForm={toggleLinkMenu}
          />
        </Box>
      </Box>
    </Portal>
  );
};

export default HoveringMenu;

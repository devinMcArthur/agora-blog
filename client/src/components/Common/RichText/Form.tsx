import { Box, Text } from "@chakra-ui/layout";
import React from "react";

import {
  BaseEditor,
  BaseRange,
  createEditor,
  Descendant,
  Editor,
  Range,
} from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { IRichText } from ".";
import { Button } from "@chakra-ui/button";
import isHotkey from "is-hotkey";

import {
  CustomElements,
  SlateStyleTypes,
  StyledText,
} from "../../../models/slate";
import Element from "./views/Element";
import Leaf from "./views/Leaf";
import StyleMenu from "./views/StyleMenu";
import { CustomEditor } from "./utils";
import Portal from "./views/Portal";
import { FiAnchor, FiCamera, FiEdit3 } from "react-icons/fi";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElements;
    Text: StyledText;
  }
}

interface ICommand {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Hotkeys = {
  "mod+b": SlateStyleTypes.bold,
  "mod+i": SlateStyleTypes.italic,
};

const Commands: ICommand[] = [
  {
    title: "Variable",
    description: "Add or create a new variable",
    icon: <FiAnchor />,
  },
  {
    title: "Quote",
    description: "Insert a quote from another page",
    icon: <FiEdit3 />,
  },
  {
    title: "Image",
    description: "Add an image",
    icon: <FiCamera />,
  },
];

const RichTextForm = ({
  value,
  onChange,
  pageId,
  submitLoading,
  onCancel,
  onSubmit,
}: IRichText) => {
  /**
   * ----- Hook Initialization -----
   */

  const [command, setCommand] =
    React.useState<{ text: string; range: BaseRange }>();
  const [commandIndex, setCommandIndex] = React.useState<number>();

  const commandPortalRef = React.useRef<HTMLDivElement | null>(null);

  /**
   * ----- Variables -----
   */

  const editor = React.useMemo(
    () => withInlineElements(withHistory(withReact(createEditor()))),
    []
  );

  const filteredCommands = React.useMemo(() => {
    if (command && !!command.text) {
      return Commands.filter((com) =>
        com.title.toLowerCase().startsWith(command?.text.toLowerCase())
      );
    } else return Commands;
  }, [command]);

  /**
   * ----- Functions -----
   */

  const handleCommands = React.useCallback(() => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);

      let beforeMatch, beforeRange;
      if (before) {
        // Handle '/<text>'
        beforeRange = Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/);
      } else if (wordBefore) {
        // Handle '/'
        beforeRange = Editor.range(editor, wordBefore, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        beforeMatch = beforeText && beforeText.match(/^\/$/);
      }

      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && beforeRange && afterMatch) {
        setCommand({ text: beforeMatch[1], range: beforeRange });
        setCommandIndex(0);
      } else {
        setCommand(undefined);
        setCommandIndex(undefined);
      }
    }
  }, [editor]);

  const handleChange = React.useCallback(
    (value: Descendant[]) => {
      onChange(value);

      // Handle commands
      handleCommands();
    },
    [onChange, handleCommands]
  );

  const handleCommand = React.useCallback((comm: ICommand) => {
    console.log("command", comm);
  }, []);

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    if (command) {
      const el = commandPortalRef.current;
      const domRange = ReactEditor.toDOMRange(editor, command.range);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  });

  /**
   * ----- Rendering -----
   */

  const renderElement = React.useCallback(
    (props) => <Element {...props} editor={editor} pageId={pageId} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Box display="flex" flexDir="row" justifyContent="space-between">
        <StyleMenu editor={editor} />
        <Box>
          {onCancel && (
            <Button
              variant="outline"
              colorScheme="red"
              onClick={onCancel}
              mx={1}
              isLoading={submitLoading}
              backgroundColor="white"
            >
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button
              borderColor="black"
              backgroundColor="white"
              onClick={onSubmit}
              mx={1}
              isLoading={submitLoading}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
      <Box overflowY="scroll" height="45rem">
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
          placeholder="Type '/' for commands"
          onKeyDown={(event) => {
            if (command && commandIndex !== undefined) {
              switch (event.code) {
                case "ArrowDown": {
                  event.preventDefault();
                  if (commandIndex + 1 < filteredCommands.length) {
                    setCommandIndex(commandIndex + 1);
                  }
                  break;
                }
                case "ArrowUp": {
                  event.preventDefault();
                  if (commandIndex !== 0) {
                    setCommandIndex(commandIndex - 1);
                  }
                  break;
                }
                case "Enter": {
                  event.preventDefault();
                  if (filteredCommands[commandIndex]) {
                    handleCommand(filteredCommands[commandIndex]);
                  }
                }
              }
            }
            for (const hotkey in Hotkeys) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                switch (hotkey) {
                  case "mod+b": {
                    CustomEditor.toggleBold(editor);
                    break;
                  }
                  case "mod+i": {
                    CustomEditor.toggleItalic(editor);
                  }
                }
              }
            }
          }}
        />
        {command && filteredCommands.length > 0 && (
          <Portal>
            <Box
              ref={commandPortalRef!}
              top="-9999px"
              left="-9999px"
              position="absolute"
              zIndex={1}
              padding="3px"
              background="white"
              borderRadius="4px"
              boxShadow="0 1px 5px rgba(0,0,0,.2"
            >
              {filteredCommands.map((com, i) => (
                <Box
                  key={com.title}
                  p="1em"
                  backgroundColor={
                    i === commandIndex ? "gray.100" : "transparent"
                  }
                >
                  <Box display="flex" flexDir="row" w="100%">
                    <Box minW="1em" maxW="1em" my="auto" mr="0.5em">
                      {com.icon}
                    </Box>
                    <Box w="100%">
                      <Text fontWeight="bold">{com.title}</Text>
                      <Text>{com.description}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Portal>
        )}
      </Box>
    </Slate>
  );
};

const withInlineElements = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  const isElementInline = (element: CustomElements) => {
    return (
      element.type === "variable" ||
      element.type === "quote" ||
      element.type === "image"
    );
  };

  editor.isInline = (element: CustomElements) => {
    return isElementInline(element) ? true : isInline(element);
  };

  editor.isVoid = (element: CustomElements) => {
    return isElementInline(element) ? true : isVoid(element);
  };

  return editor;
};

export default React.memo(RichTextForm);

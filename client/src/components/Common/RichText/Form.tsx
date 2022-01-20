import { Box } from "@chakra-ui/layout";
import React from "react";

import {
  BaseEditor,
  BaseRange,
  createEditor,
  Descendant,
  Editor,
  Range,
  Text,
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
import { CustomEditor } from "./utils";
import {
  ICommandList,
  InputMenuTypes,
  useRichText,
} from "../../../contexts/RichText";
import Menu from "./views/Menu";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElements;
    Text: StyledText;
  }
}

const Hotkeys = {
  "mod+b": SlateStyleTypes.bold,
  "mod+i": SlateStyleTypes.italic,
  "mod+k": SlateStyleTypes.link,
  escape: "remove",
};

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

  const {
    command,
    commandIndex,
    filteredCommands,
    inputMenu,
    savedSelection,
    setCommand,
    setCommandIndex,
    setInputMenu,
  } = useRichText();

  /**
   * ----- Variables -----
   */

  const editor = React.useMemo(
    () => withInlineElements(withHistory(withReact(createEditor()))),
    []
  );

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

      // Handle '*/'
      if (!beforeMatch) {
        const newBefore = Editor.before(editor, start, { unit: "character" });
        beforeRange = newBefore && Editor.range(editor, newBefore, start);
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
  }, [editor, setCommand, setCommandIndex]);

  const handleChange = React.useCallback(
    (value: Descendant[]) => {
      onChange(value);

      // Handle commands
      handleCommands();
    },
    [onChange, handleCommands]
  );

  const handleCommand = React.useCallback(
    (comm: ICommandList, range: BaseRange) => {
      switch (comm.title) {
        case "Variable": {
          setInputMenu({ type: InputMenuTypes.variable, range });
          break;
        }
        case "Quote": {
          setInputMenu({ type: InputMenuTypes.quote, range });
          break;
        }
        case "Image": {
          setInputMenu({ type: InputMenuTypes.image, range });
          break;
        }
      }
    },
    [setInputMenu]
  );

  /**
   * ----- Use-effect and other logic -----
   */

  React.useEffect(() => {
    const escapeFunction = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCommand(undefined);
        setCommandIndex(undefined);
        setInputMenu(undefined);
      }
    };

    document.addEventListener("keydown", escapeFunction, false);

    return () => {
      document.removeEventListener("keydown", escapeFunction, false);
    };
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
        <Menu editor={editor} />
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
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
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
              case "Tab":
              case "Enter": {
                event.preventDefault();
                if (filteredCommands[commandIndex]) {
                  handleCommand(filteredCommands[commandIndex], command.range);
                }
              }
            }
          }
          if (inputMenu) setInputMenu(undefined);
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
                  break;
                }
                case "mod+k": {
                  if (
                    !inputMenu &&
                    editor.selection &&
                    !Range.isCollapsed(editor.selection)
                  ) {
                    setInputMenu({
                      type: InputMenuTypes.link,
                      range: editor.selection,
                    });
                  }
                  break;
                }
              }
            }
          }
        }}
        decorate={([node, path]) => {
          if (
            Text.isText(node) &&
            !editor.selection &&
            !!savedSelection?.slateSelection
          ) {
            const intersection = Range.intersection(
              savedSelection.slateSelection,
              Editor.range(editor, path)
            );

            if (!intersection) return [];

            const range = {
              highlight: true,
              ...intersection,
            };

            return [range];
          }

          return [];
        }}
      />
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

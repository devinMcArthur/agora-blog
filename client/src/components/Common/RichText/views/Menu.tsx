import { Box, BoxProps, Text, useOutsideClick } from "@chakra-ui/react";
import React from "react";

import { Editor, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { InputMenuTypes, useRichText } from "../../../../contexts/RichText";
import { SlateMarks } from "../../../../models/slate";
import isValidUrl from "../../../../utils/isValidUrl";
import { CustomEditor } from "../utils";
import HoveringMenu from "./HoveringMenu";
import ImageForm from "./ImageForm";
import LinkForm from "./LinkForm";
import Portal from "./Portal";
import QuoteForm from "./QuoteForm";
import VariableForm from "./VariableForm";

interface IMenu {
  editor: Editor;
}

const PortalBoxStyle: BoxProps = {
  top: "-9999px",
  left: "-9999px",
  position: "absolute",
  zIndex: 9999,
  padding: "3px",
  background: "white",
  borderRadius: "4px",
  boxShadow: "0 1px 5px rgba(0,0,0,.2)",
};

const Menu = ({ editor }: IMenu) => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    command,
    commandIndex,
    inputMenu,
    filteredCommands,
    savedSelection,
    setCommand,
    setInputMenu,
    saveSelection,
    restoreDomSelection,
    clearSelection,
  } = useRichText();

  const [linkFormError, setLinkFormError] = React.useState<boolean>(false);
  const [linkFormDefault, setLinkFormDefault] = React.useState<string>("");

  const commandPortalRef = React.useRef<HTMLDivElement | null>(null);
  const inputMenuPortalRef = React.useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: commandPortalRef,
    handler: () => setCommand(undefined),
  });

  useOutsideClick({
    ref: inputMenuPortalRef,
    handler: () => setInputMenu(undefined),
  });

  /**
   * ----- Variables -----
   */

  const linkMarkActive = React.useMemo(() => {
    return (
      CustomEditor.isMarkActive(editor, SlateMarks.externalMentionUrl) ||
      CustomEditor.isMarkActive(editor, SlateMarks.internalMentionPage)
    );
    // include inputmenu changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, inputMenu]);

  /**
   * ----- Functions -----
   */

  const handleLinkFormOff = React.useCallback(() => {
    if (savedSelection?.slateSelection) {
      Transforms.select(editor, savedSelection.slateSelection);
      restoreDomSelection();
      clearSelection();
    }

    setLinkFormDefault("");
    setLinkFormError(false);
  }, [
    clearSelection,
    editor,
    restoreDomSelection,
    savedSelection?.slateSelection,
  ]);

  const handleLinkFormOn = React.useCallback(() => {
    saveSelection(editor.selection);

    const marks = CustomEditor.getMarks(editor);
    if (marks?.externalMentionUrl) {
      setLinkFormDefault(marks.externalMentionUrl);
    } else if (marks?.internalMentionPage) {
      setLinkFormDefault(marks.internalMentionPage.title);
    }
  }, [editor, saveSelection]);

  const toggleLinkMenu = React.useCallback(() => {
    if (inputMenu && inputMenu.type === InputMenuTypes.link) {
      // Toggling form off
      handleLinkFormOff();
      setInputMenu(undefined);
    } else {
      // Toggling form on

      if (editor.selection) {
        handleLinkFormOn();

        setInputMenu({
          type: InputMenuTypes.link,
          range: editor.selection,
        });
      }
    }
  }, [
    editor.selection,
    handleLinkFormOff,
    handleLinkFormOn,
    inputMenu,
    setInputMenu,
  ]);

  const externalLinkSubmit = React.useCallback(
    (value: string) => {
      /**
       * Toggle must be first to allow selection to be reinstated so mark is added
       * in correct location
       */

      if (isValidUrl(value)) {
        handleLinkFormOff();
        CustomEditor.setExternalUrl(editor, value);
        setInputMenu(undefined);
      } else {
        setLinkFormError(true);
      }
    },
    [editor, handleLinkFormOff, setInputMenu]
  );

  const internalLinkSubmit = React.useCallback(
    (page: { id: string; title: string }) => {
      handleLinkFormOff();
      CustomEditor.setInternal(editor, page);
      setInputMenu(undefined);
    },
    [editor, handleLinkFormOff, setInputMenu]
  );

  /**
   * ----- Use-effects and other logic -----
   */

  // handle command menu
  React.useEffect(() => {
    if (command) {
      const el = commandPortalRef.current;
      const domRange = ReactEditor.toDOMRange(editor, command.range);
      const rect = domRange.getBoundingClientRect();
      console.log("---start---");
      console.log(el?.offsetHeight);
      console.log(window.innerHeight);
      console.log(rect.top);
      console.log(window.pageYOffset);
      console.log("---end---");
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    } else if (inputMenu !== undefined) {
      const el = inputMenuPortalRef.current;
      const domRange = ReactEditor.toDOMRange(editor, inputMenu.range);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;

        switch (inputMenu.type) {
          case InputMenuTypes.link: {
            const linkForm = document.getElementById("link-form");
            linkForm?.focus();
            break;
          }
        }
      }
    }
  });

  React.useEffect(() => {
    if (inputMenu !== undefined && command !== undefined) {
      setCommand(undefined);
    }
  }, [command, inputMenu, setCommand]);

  // Handle input menu changes
  React.useEffect(() => {
    if (!inputMenu) {
      // Input menu being removed

      handleLinkFormOff();
    } else {
      // Input menu toggled on

      switch (inputMenu.type) {
        case InputMenuTypes.link: {
          // Link menu toggled on
          handleLinkFormOn();

          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMenu]);

  /**
   * ----- Rendering -----
   */

  const portal = React.useMemo(() => {
    if (command && filteredCommands.length > 0) {
      return (
        <Portal>
          <Box ref={commandPortalRef} {...PortalBoxStyle}>
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
      );
    } else if (inputMenu !== undefined) {
      let content;
      switch (inputMenu.type) {
        case InputMenuTypes.variable: {
          content = (
            <VariableForm
              variableSelect={(variable) => {
                Transforms.select(editor, inputMenu.range);
                CustomEditor.setVariable(editor, variable);
                setInputMenu(undefined);
              }}
            />
          );
          break;
        }
        case InputMenuTypes.quote: {
          content = (
            <QuoteForm
              quoteSubmit={(statementId) => {
                Transforms.select(editor, inputMenu.range);
                CustomEditor.setInlineQuote(editor, statementId);
                setInputMenu(undefined);
              }}
            />
          );
          break;
        }
        case InputMenuTypes.image: {
          content = (
            <ImageForm
              imageUploaded={(image) => {
                Transforms.select(editor, inputMenu.range);
                CustomEditor.addImage(editor, image.buffer, image.contentType);
                setInputMenu(undefined);
              }}
            />
          );
          break;
        }
        case InputMenuTypes.link: {
          content = (
            <LinkForm
              handleSubmit={externalLinkSubmit}
              pageSelect={internalLinkSubmit}
              isInvalid={linkFormError}
              defaultValue={linkFormDefault}
              markActive={linkMarkActive}
              removeMark={() => {
                toggleLinkMenu();
                CustomEditor.removeLink(editor);
              }}
            />
          );
        }
      }
      return (
        <Portal>
          <Box ref={inputMenuPortalRef} {...PortalBoxStyle}>
            {content}
          </Box>
        </Portal>
      );
    } else {
      return null;
    }
  }, [
    command,
    commandIndex,
    editor,
    externalLinkSubmit,
    filteredCommands,
    inputMenu,
    internalLinkSubmit,
    linkFormDefault,
    linkFormError,
    linkMarkActive,
    setInputMenu,
    toggleLinkMenu,
  ]);

  return (
    <>
      <HoveringMenu editor={editor} toggleLinkMenu={toggleLinkMenu} />
      {portal}
    </>
  );
};

export default Menu;

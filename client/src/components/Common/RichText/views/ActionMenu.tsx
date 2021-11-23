import React from "react";

import { css, cx } from "@emotion/css";
import MarkButton from "./MarkButton";
import { Editor, Range as SlateRange, Transforms } from "slate";
import {
  StyledText,
  SlateMarks,
  SlateStyleTypes,
} from "../../../../models/slate";
import LinkForm from "./LinkForm";
import { CustomEditor } from "../utils";
import isValidUrl from "../../../../utils/isValidUrl";
import { Box, Divider } from "@chakra-ui/layout";
import { useOutsideClick } from "@chakra-ui/hooks";
import VariableForm from "./VariableForm";
import QuoteForm from "./QuoteForm";
import { useRichText } from "../../../../contexts/RichText";

enum ShowForm {
  Link = "Link",
  Variable = "Variable",
  Quote = "Quote",
}

interface IActionMenu {
  editor: Editor;
}

const ActionMenu: React.FC<IActionMenu> = ({ editor }) => {
  const {
    savedSelection,
    saveSelection,
    clearSelection: clearSel,
    restoreDomSelection,
  } = useRichText();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [form, setForm] = React.useState<ShowForm>();

  const [linkFormError, setLinkFormError] = React.useState(false);
  const [linkFormDefault, setLinkFormDefault] = React.useState("");
  const [variableFormDefault, setVariableFormDefault] = React.useState("");

  /**
   * ------ Functions ------
   */

  const clearSelection = React.useCallback(() => {
    clearSel();
  }, [clearSel]);

  const saveSelectionCopy = React.useCallback(() => {
    saveSelection(editor.selection);
  }, [editor.selection, saveSelection]);

  const toggleLinkForm = React.useCallback(
    (marks?: Omit<StyledText, "text"> | null) => {
      if (form === ShowForm.Link) {
        // Toggling link form off
        if (savedSelection?.slateSelection) {
          Transforms.select(editor, savedSelection.slateSelection);
          restoreDomSelection();
          clearSelection();
        }
        setLinkFormDefault("");
        setForm(undefined);
      } else {
        // Toggling link form on
        saveSelectionCopy();

        if (marks?.externalMentionUrl) {
          setLinkFormDefault(marks.externalMentionUrl);
        } else if (marks?.internalMentionPage) {
          setLinkFormDefault(marks.internalMentionPage.title);
        }

        setForm(ShowForm.Link);
      }
    },
    [
      clearSelection,
      editor,
      form,
      restoreDomSelection,
      saveSelectionCopy,
      savedSelection?.slateSelection,
    ]
  );

  const toggleVariableForm = () => {
    if (form === ShowForm.Variable) {
      // Toggling variable form off
      if (savedSelection?.slateSelection) {
        Transforms.select(editor, savedSelection.slateSelection);
        restoreDomSelection();
        clearSelection();
      }

      setVariableFormDefault("");
      setForm(undefined);
    } else {
      // Toggling variable form on
      saveSelectionCopy();

      setForm(ShowForm.Variable);
    }
  };

  const toggleQuoteForm = () => {
    if (form === ShowForm.Quote) {
      if (savedSelection?.slateSelection) {
        Transforms.select(editor, savedSelection.slateSelection);
        restoreDomSelection();
        clearSelection();
      }

      setForm(undefined);
    } else {
      // Toggling quote form on
      saveSelectionCopy();

      setForm(ShowForm.Quote);
    }
  };

  const externalLinkSubmit = (value: string) => {
    /**
     * Toggle must be first to allow selection to be reinstated so mark is added
     * in correct location
     */

    if (isValidUrl(value)) {
      toggleLinkForm();
      CustomEditor.setExternalUrl(editor, value);
    } else {
      setLinkFormError(true);
    }
  };

  const internalLinkSubmit = (page: { id: string; title: string }) => {
    toggleLinkForm();
    CustomEditor.setInternal(editor, page);
  };

  const variableSubmit = (variable: {
    id: string;
    title: string;
    finalValue: number;
  }) => {
    toggleVariableForm();
    CustomEditor.setVariable(editor, variable);
  };

  const quoteSubmit = (statementId: string) => {
    toggleQuoteForm();
    CustomEditor.setInlineQuote(editor, statementId);
  };

  /**
   * ----- Variables -----
   */

  const linkMarkActive = React.useMemo(() => {
    return (
      CustomEditor.isMarkActive(editor, SlateMarks.externalMentionUrl) ||
      CustomEditor.isMarkActive(editor, SlateMarks.internalMentionPage)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, form]);

  /**
   * ----- Use-effects and other logic -----
   */

  useOutsideClick({
    ref: ref,
    handler: () => clearSelection(),
  });

  React.useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) return;

    // Clear menu if necessary
    if (
      !savedSelection &&
      (!selection ||
        SlateRange.isCollapsed(selection) ||
        Editor.string(editor, selection) === "")
    ) {
      if (!!form) toggleLinkForm();
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();

    // Set menu position if possible
    if (domSelection || savedSelection?.domRange) {
      let range = domSelection?.getRangeAt(0);

      if (savedSelection?.domRange) {
        range = savedSelection.domRange;
      }
      if (range) {
        const rect = range.getBoundingClientRect();

        el.style.opacity = "1";
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
        el.style.left = `${
          rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
        }px`;
      } else console.warn("Unable to find range");
    }
  });

  return (
    <div
      ref={ref}
      className={cx(
        css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
          width: auto;
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
            margin-right: 15px;
          }
        `
      )}
    >
      <Box display="flex" flexDir="column">
        <Box display="flex" flexDir="row">
          <MarkButton editor={editor} styleType={SlateStyleTypes.bold} />
          <MarkButton editor={editor} styleType={SlateStyleTypes.italic} />
          <MarkButton
            editor={editor}
            styleType={SlateStyleTypes.link}
            toggleLinkForm={toggleLinkForm}
          />
          <MarkButton
            editor={editor}
            styleType={SlateStyleTypes.variable}
            toggleVariableForm={toggleVariableForm}
          />
          <MarkButton
            editor={editor}
            styleType={SlateStyleTypes.quote}
            toggleQuoteForm={toggleQuoteForm}
          />
        </Box>

        {form && (
          <>
            <Divider marginTop={1} marginBottom={1} color="white" />
            {form === ShowForm.Link && (
              <LinkForm
                handleSubmit={externalLinkSubmit}
                pageSelect={internalLinkSubmit}
                isInvalid={linkFormError}
                defaultValue={linkFormDefault}
                markActive={linkMarkActive}
                removeMark={() => CustomEditor.removeLink(editor)}
              />
            )}
            {form === ShowForm.Variable && (
              <VariableForm
                variableSelect={variableSubmit}
                defaultValue={variableFormDefault}
              />
            )}
            {form === ShowForm.Quote && <QuoteForm quoteSubmit={quoteSubmit} />}
          </>
        )}
      </Box>
    </div>
  );
};

export default ActionMenu;

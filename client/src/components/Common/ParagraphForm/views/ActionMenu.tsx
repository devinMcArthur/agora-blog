import React from "react";

import { css, cx } from "@emotion/css";
import MarkButton from "./MarkButton";
import { Editor, Range, Transforms } from "slate";
import {
  SlateLeaf,
  SlateMarks,
  SlateStyleTypes,
} from "../../../../models/slate";
import LinkForm from "./LinkForm";
import { useParagraphForm } from "../../../../contexts/ParagraphForm";
import { CustomEditor } from "../utils";
import isValidUrl from "../../../../utils/isValidUrl";
import { Box, Divider } from "@chakra-ui/layout";
import { useOutsideClick } from "@chakra-ui/hooks";

enum ShowForm {
  Link = "Link",
}

interface IActionMenu {
  editor: Editor;
}

const ActionMenu: React.FC<IActionMenu> = ({ editor }) => {
  const { savedSelection, saveSelection, clearSelection, restoreDomSelection } =
    useParagraphForm();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [form, setForm] = React.useState<ShowForm>();

  const [linkFormError, setLinkFormError] = React.useState(false);
  const [linkFormDefault, setLinkFormDefault] = React.useState("");

  /**
   * ------ Functions ------
   */

  const toggleLinkForm = (marks?: Omit<SlateLeaf, "text"> | null) => {
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
      saveSelection(Object.assign({}, editor.selection));

      if (marks?.externalMentionUrl) {
        setLinkFormDefault(marks.externalMentionUrl);
      } else if (marks?.internalMentionPage) {
        setLinkFormDefault(marks.internalMentionPage.title);
      }

      setForm(ShowForm.Link);
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
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === "")
    ) {
      if (!!form) toggleLinkForm();
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();

    // Clear savedSelection if another section is made outside of linkForm
    if (
      savedSelection &&
      !!form &&
      selection?.anchor.offset !==
        savedSelection.slateSelection?.anchor.offset &&
      selection?.focus.offset !== savedSelection.slateSelection?.focus.offset &&
      domSelection &&
      domSelection.anchorNode?.parentElement?.id !== "link-form"
    ) {
      clearSelection();
    }

    // Set menu position if possible
    if (domSelection || savedSelection?.domRange) {
      let range = domSelection?.getRangeAt(0);
      if (savedSelection?.domRange) range = savedSelection.domRange;
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
          <MarkButton editor={editor} type={SlateStyleTypes.bold} />
          <MarkButton editor={editor} type={SlateStyleTypes.italic} />
          <MarkButton
            editor={editor}
            type={SlateStyleTypes.link}
            toggleLinkForm={toggleLinkForm}
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
          </>
        )}
      </Box>
    </div>
  );
};

export default ActionMenu;

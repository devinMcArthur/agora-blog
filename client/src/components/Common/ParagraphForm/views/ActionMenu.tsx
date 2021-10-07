import React from "react";

import { css, cx } from "@emotion/css";
import MarkButton from "./MarkButton";
import { Editor, Range, Transforms } from "slate";
import { SlateStyleTypes } from "../../../../models/slate";
import LinkForm from "./LinkForm";
import { useParagraphForm } from "../../../../contexts/ParagraphForm";
import { CustomEditor } from "../utils";

interface IActionMenu {
  editor: Editor;
}

const ActionMenu: React.FC<IActionMenu> = ({ editor }) => {
  const { savedSelection, saveSelection, clearSelection, restoreDomSelection } =
    useParagraphForm();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [linkForm, setLinkForm] = React.useState(false);

  /**
   * ------ Functions ------
   */

  const toggleLinkForm = () => {
    if (linkForm) {
      // Toggling link form off
      if (savedSelection?.slateSelection) {
        Transforms.select(editor, savedSelection.slateSelection);
        restoreDomSelection();
        clearSelection();
      }
    } else {
      // Toggling link form on
      saveSelection(Object.assign({}, editor.selection));
    }
    setLinkForm(!linkForm);
  };

  const linkSubmit = (value: string) => {
    /**
     * Toggle must be first to allow selection to be reinstated so mark is added
     * in correct location
     */
    toggleLinkForm();
    CustomEditor.toggleExternalUrl(editor, value);
  };

  /**
   * ----- Use-effects and other logic -----
   */

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
      if (linkForm) toggleLinkForm();
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();

    // Clear savedSelection if another section is made outside of linkForm
    if (
      savedSelection &&
      linkForm &&
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
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    >
      <MarkButton editor={editor} type={SlateStyleTypes.bold} />
      <MarkButton editor={editor} type={SlateStyleTypes.italic} />
      <MarkButton
        editor={editor}
        type={SlateStyleTypes.link}
        toggleLinkForm={toggleLinkForm}
      />
      <LinkForm active={linkForm} handleSubmit={linkSubmit} />
    </div>
  );
};

export default ActionMenu;

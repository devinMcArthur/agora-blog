import React from "react";
import { BaseSelection } from "slate";

export interface IRichTextContext {
  savedSelection?: { slateSelection: BaseSelection; domRange: Range };

  saveSelection: (selection: BaseSelection) => void;
  clearSelection: () => void;
  restoreDomSelection: () => void;
}

const RichTextContext = React.createContext<IRichTextContext | undefined>(
  undefined
);

/**
 * ----- Provider -----
 */

const RichTextProvider: React.FC = ({ children }) => {
  const [savedSelection, setSavedSelection] =
    React.useState<IRichTextContext["savedSelection"]>();

  const saveSelection: IRichTextContext["saveSelection"] = (selection) => {
    const sel = window.getSelection();
    if (sel && sel.getRangeAt(0) && sel?.rangeCount) {
      setSavedSelection({
        slateSelection: selection,
        domRange: sel.getRangeAt(0),
      });
    } else throw new Error("Unable to save dom selection");
  };

  const restoreDomSelection: IRichTextContext["restoreDomSelection"] = () => {
    if (savedSelection?.domRange) {
      if (window.getSelection()) {
        var sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(savedSelection.domRange);
      }
    }
  };

  const clearSelection: IRichTextContext["clearSelection"] = () =>
    setSavedSelection(undefined);

  return (
    <RichTextContext.Provider
      value={{
        savedSelection,
        saveSelection,
        restoreDomSelection,
        clearSelection,
      }}
    >
      {children}
    </RichTextContext.Provider>
  );
};

/**
 * ----- Context hook -----
 */

const useRichText = () => {
  const context = React.useContext(RichTextContext);

  if (context === undefined)
    throw new Error(
      "useRichText can only be used in a component wrapped by RichTextProvider"
    );

  return context;
};

export { RichTextProvider, useRichText };

import React from "react";
import { FiAnchor, FiCamera, FiEdit3 } from "react-icons/fi";
import { BaseRange, BaseSelection } from "slate";

export enum InputMenuTypes {
  variable,
  quote,
  image,
  link,
}

export interface IInputMenu {
  type: InputMenuTypes;
  range: BaseRange;
}

export interface ICommand {
  text: string;
  range: BaseRange;
}

export interface ICommandList {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface IRichTextContext {
  savedSelection?: { slateSelection: BaseSelection; domRange: Range };
  inputMenu?: IInputMenu;
  command?: ICommand;
  commandIndex?: number;
  filteredCommands: ICommandList[];

  setInputMenu: React.Dispatch<React.SetStateAction<IInputMenu | undefined>>;
  setCommand: React.Dispatch<React.SetStateAction<ICommand | undefined>>;
  setCommandIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  saveSelection: (selection: BaseSelection) => void;
  clearSelection: () => void;
  restoreDomSelection: () => void;
}

const RichTextContext = React.createContext<IRichTextContext | undefined>(
  undefined
);

const Commands: ICommandList[] = [
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

/**
 * ----- Provider -----
 */

const RichTextProvider: React.FC = ({ children }) => {
  /**
   * ----- Hook Initialization -----
   */

  const [savedSelection, setSavedSelection] =
    React.useState<IRichTextContext["savedSelection"]>();

  const [inputMenu, setInputMenu] =
    React.useState<IRichTextContext["inputMenu"]>();

  const [command, setCommand] = React.useState<IRichTextContext["command"]>();
  const [commandIndex, setCommandIndex] =
    React.useState<IRichTextContext["commandIndex"]>();

  /**
   * ----- Variables -----
   */

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
        inputMenu,
        savedSelection,
        command,
        commandIndex,
        filteredCommands,

        setInputMenu,
        setCommand,
        setCommandIndex,
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

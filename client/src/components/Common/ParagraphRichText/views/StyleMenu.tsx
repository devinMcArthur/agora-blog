import { ButtonProps } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Divider } from "@chakra-ui/layout";
import React from "react";

import { Editor, Transforms } from "slate";
import { useParagraphForm } from "../../../../contexts/ParagraphForm";
import {
  SlateMarks,
  SlateStyleTypes,
  StyledText,
} from "../../../../models/slate";
import isValidUrl from "../../../../utils/isValidUrl";
import { CustomEditor } from "../utils";
import LinkForm from "./LinkForm";
import MarkButton from "./MarkButton";
import QuoteForm from "./QuoteForm";
import VariableForm from "./VariableForm";

enum ShowForm {
  Link = "Link",
  Variable = "Variable",
  Quote = "Quote",
  Image = "Image",
}

interface IStyleMenu {
  editor: Editor;
  buttonSize?: ButtonProps["size"];
}

const StyleMenu = ({ editor, buttonSize }: IStyleMenu) => {
  const {
    savedSelection,
    clearSelection,
    restoreDomSelection,
    saveSelection: saveSelectionContext,
  } = useParagraphForm();

  React.useEffect(() => {
    console.log("-- INITIAL STYLE-MENU MOUNT --");
  }, []);

  const [form, setForm] = React.useState<ShowForm>();

  const [linkFormError, setLinkFormError] = React.useState(false);
  const [linkFormDefault, setLinkFormDefault] = React.useState("");
  const [variableFormDefault, setVariableFormDefault] = React.useState("");

  React.useEffect(() => {
    console.log("styleMenuSelection", editor.selection);
  }, [editor.selection]);

  React.useEffect(() => {
    console.log("styleMenuContextSelection", savedSelection);
  }, [savedSelection]);

  /**
   * ----- Functions -----
   */

  const saveSelection = React.useCallback(() => {
    saveSelectionContext(editor.selection);
  }, [editor.selection, saveSelectionContext]);

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
        saveSelection();

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
      savedSelection?.slateSelection,
      saveSelection,
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
      saveSelection();

      setForm(ShowForm.Variable);
    }
  };

  const toggleQuoteForm = () => {
    if (form === ShowForm.Quote) {
      // Toggle quote form off

      if (savedSelection?.slateSelection) {
        Transforms.select(editor, savedSelection.slateSelection);
        restoreDomSelection();
        clearSelection();
      }

      setForm(undefined);
    } else {
      // Toggling quote form on
      saveSelection();

      setForm(ShowForm.Quote);
    }
  };

  const toggleImageForm = () => {
    if (form === ShowForm.Image) {
      // Toggle Image form off

      setForm(undefined);
    } else {
      // Toggle Image form on

      setForm(ShowForm.Image);
    }
  };

  const onFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          CustomEditor.addImage(
            editor,
            event.target.result.toString(),
            files[0].type,
            files[0].name
          );
        }
      };

      reader.onerror = (error) => {
        console.warn(error);
      };

      reader.readAsDataURL(files[0]);
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
    CustomEditor.setQuote(editor, statementId);
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

  return (
    <Box display="flex" flexDir="column">
      <Box display="flex" flexDir="row">
        <MarkButton
          size={buttonSize}
          editor={editor}
          styleType={SlateStyleTypes.bold}
        />
        <MarkButton
          size={buttonSize}
          editor={editor}
          styleType={SlateStyleTypes.italic}
        />
        <MarkButton
          size={buttonSize}
          editor={editor}
          styleType={SlateStyleTypes.link}
          toggleLinkForm={toggleLinkForm}
          requireSelection
        />
        <MarkButton
          size={buttonSize}
          editor={editor}
          styleType={SlateStyleTypes.variable}
          toggleVariableForm={toggleVariableForm}
          requireSelection
        />
        <MarkButton
          size={buttonSize}
          editor={editor}
          styleType={SlateStyleTypes.quote}
          toggleQuoteForm={toggleQuoteForm}
          requireSelection
        />
        <MarkButton
          size={buttonSize}
          editor={editor}
          styleType={SlateStyleTypes.image}
          toggleImageForm={toggleImageForm}
          requireSelection
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
          {form === ShowForm.Image && (
            <Input
              m="auto"
              type="file"
              onChange={(e) => {
                onFileChange(e.target.files);
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default StyleMenu;

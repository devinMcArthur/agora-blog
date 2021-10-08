import { Editor, Transforms } from "slate";
import { SlateMarks } from "../../../models/slate";

export const CustomEditor = {
  isMarkActive: (editor: Editor, mark: SlateMarks) => {
    const marks = Editor.marks(editor);

    if (!marks) return false;
    return !!marks[mark];
  },
  getMarks: (editor: Editor) => {
    return Editor.marks(editor);
  },
  toggleBold: (editor: Editor) => {
    const isActive = CustomEditor.isMarkActive(editor, SlateMarks.bold);

    if (isActive) {
      Editor.removeMark(editor, SlateMarks.bold);
    } else {
      Editor.addMark(editor, SlateMarks.bold, true);
    }
  },
  setExternalUrl: (editor: Editor, url?: string) => {
    // Remove internal mention if necessary
    const isInternalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.internalMentionPage
    );
    if (isInternalActive)
      Editor.removeMark(editor, SlateMarks.internalMentionPage);

    if (url) {
      Editor.addMark(editor, SlateMarks.externalMentionUrl, url);
    }
  },
  setInternal: (editor: Editor, value?: { id: string; title: string }) => {
    // Remove external mention if necessary
    const isExternalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.externalMentionUrl
    );
    if (isExternalActive)
      Editor.removeMark(editor, SlateMarks.externalMentionUrl);

    if (value) {
      Editor.addMark(editor, SlateMarks.internalMentionPage, value);
    }
  },
  removeLink: (editor: Editor) => {
    const internalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.internalMentionPage
    );
    if (internalActive)
      Editor.removeMark(editor, SlateMarks.internalMentionPage);

    const externalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.externalMentionUrl
    );
    if (externalActive)
      Editor.removeMark(editor, SlateMarks.externalMentionUrl);
  },
  setVariable: (
    editor: Editor,
    variable: { id: string; title: string; finalValue: number }
  ) => {
    const { id, title, finalValue } = variable;
    Transforms.insertNodes(editor, {
      type: "variable",
      id,
      title,
      finalValue,
      children: [{ text: finalValue.toString() }],
    });
    Transforms.move(editor);
  },
  toggleItalic: (editor: Editor) => {
    const isActive = CustomEditor.isMarkActive(editor, SlateMarks.italic);

    if (isActive) {
      Editor.removeMark(editor, SlateMarks.italic);
    } else {
      Editor.addMark(editor, SlateMarks.italic, true);
    }
  },
};

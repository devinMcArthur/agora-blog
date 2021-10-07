import { Editor } from "slate";
import { SlateMarks } from "../../../models/slate";

export const CustomEditor = {
  isMarkActive: (editor: Editor, mark: SlateMarks) => {
    const marks = Editor.marks(editor);

    if (!marks) return false;
    return !!marks[mark];
  },
  toggleBold: (editor: Editor) => {
    const isActive = CustomEditor.isMarkActive(editor, SlateMarks.bold);

    if (isActive) {
      Editor.removeMark(editor, SlateMarks.bold);
    } else {
      Editor.addMark(editor, SlateMarks.bold, true);
    }
  },
  toggleExternalUrl: (editor: Editor, url?: string) => {
    // Remove internal mention if necessary
    const isInternalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.internalMentionPageId
    );
    if (isInternalActive)
      Editor.removeMark(editor, SlateMarks.internalMentionPageId);

    // Handle external link
    const isActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.externalMentionUrl
    );

    if (isActive) {
      console.log("removeMark");
      Editor.removeMark(editor, SlateMarks.externalMentionUrl);
    } else {
      console.log("addMark", url);
      Editor.addMark(editor, SlateMarks.externalMentionUrl, url);
    }
  },
  removeLink: (editor: Editor) => {
    console.log("removeLink");
    const internalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.internalMentionPageId
    );
    if (internalActive)
      Editor.removeMark(editor, SlateMarks.internalMentionPageId);

    const externalActive = CustomEditor.isMarkActive(
      editor,
      SlateMarks.externalMentionUrl
    );
    if (externalActive)
      Editor.removeMark(editor, SlateMarks.externalMentionUrl);
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

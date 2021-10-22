import { BaseSelection, Editor, Transforms } from "slate";
import {
  ImageElementType,
  ISlateQuestion,
  SlateMarks,
  StatementElementType,
} from "../../../models/slate";

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
  setQuote: (editor: Editor, statementId: string, nodeIndex?: number) => {
    const options: any = {};
    if (nodeIndex !== undefined) options.at = [nodeIndex, 0];

    Transforms.insertNodes(
      editor,
      {
        type: "quote",
        statementId,
        children: [{ text: "" }],
      },
      { ...options }
    );
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
  removeStatement: (editor: Editor, nodeIndex: number) => {
    Transforms.removeNodes(editor, {
      at: [nodeIndex],
    });
  },
  moveStatement: (
    editor: Editor,
    nodeIndex: number,
    direction: "up" | "down"
  ) => {
    let toIndex = 0;
    if (direction === "up") {
      toIndex = nodeIndex + 1;
    } else {
      if (nodeIndex !== 0) toIndex = nodeIndex - 1;
    }

    Transforms.moveNodes(editor, {
      at: [nodeIndex],
      to: [toIndex],
    });
  },
  addQuestion: (
    editor: Editor,
    nodeIndex: number,
    question: ISlateQuestion
  ) => {
    const node = Editor.node(editor, [nodeIndex]);

    const element: StatementElementType = JSON.parse(JSON.stringify(node[0]));
    if (element && element.type === "statement") {
      element.questions.push(question);
      Transforms.setNodes(editor, element, { at: [nodeIndex] });
    }
  },
  removeQuestion: (editor: Editor, nodeIndex: number, index: number) => {
    const node = Editor.node(editor, [nodeIndex]);

    const element: StatementElementType = JSON.parse(JSON.stringify(node[0]));
    if (element && !!element.questions[index]) {
      element.questions.splice(index, 1);
      Transforms.setNodes(editor, element, { at: [nodeIndex] });
    }
  },
  addNewQuestion: (editor: Editor, nodeIndex: number, question: string) => {
    const node = Editor.node(editor, [nodeIndex]);

    const element: StatementElementType = JSON.parse(JSON.stringify(node[0]));
    if (element && element.type === "statement") {
      element.newQuestions.push({ question });
      Transforms.setNodes(editor, element, { at: [nodeIndex] });
    }
  },
  removeNewQuestion: (editor: Editor, nodeIndex: number, index: number) => {
    const node = Editor.node(editor, [nodeIndex]);

    const element: StatementElementType = JSON.parse(JSON.stringify(node[0]));
    if (element && !!element.newQuestions[index]) {
      element.newQuestions.splice(index, 1);
      Transforms.setNodes(editor, element, { at: [nodeIndex] });
    }
  },
  updateImage: (
    editor: Editor,
    imageElement: ImageElementType,
    selection: BaseSelection
  ) => {
    if (selection) {
      console.log("imageElement", imageElement);
      console.log("selection", selection);
      Transforms.setNodes(editor, imageElement, {
        at: [selection.anchor.path[0], selection.anchor.path[1]],
      });
    }
  },
  addImage: (
    editor: Editor,
    buffer: string,
    contentType: string,
    fileName: string
  ) => {
    console.log("buffer", buffer);
    Transforms.insertNodes(editor, {
      type: "image",
      contentType,
      buffer,
      children: [{ text: "" }],
      name: fileName,
    });
  },
};

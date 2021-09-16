export const getParentSpanFromSelection = (selection: Selection | null) => {
  const recursionLimit = 5;
  const findParentSpan = (
    node: Node,
    count: number = 0
  ): HTMLElement | undefined => {
    if (count === recursionLimit || !node.parentElement) return undefined;
    if (node.parentElement?.className === "parent-input")
      return node.parentElement;
    return findParentSpan(node.parentElement, count + 1);
  };

  if (selection && selection.anchorNode) {
    return findParentSpan(selection.anchorNode);
  } else return undefined;
};

const replaceSpaces = (text: string, replacement = "_") => {
  return text.replace(/ /g, replacement);
};

export default replaceSpaces;

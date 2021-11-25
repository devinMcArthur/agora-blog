const setDocumentTitle = (string?: string) => {
  if (!!string) {
    document.title = `${string} - agora`;
  } else {
    document.title = "agora";
  }
};

export default setDocumentTitle;

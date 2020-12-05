type APIConfigType = {
  method: "GET" | "get" | undefined;
  url: string;
};

const GETpageRoot: APIConfigType = {
  method: "GET",
  url: "/page/root",
};

const GETpageSlug: APIConfigType = {
  method: "GET",
  url: "/page/slug/{{pageSlug}}",
};

const GETquestionRoot: APIConfigType = {
  method: "GET",
  url: "/question/root",
};

const GETquestion: APIConfigType = {
  method: "GET",
  url: "/question/{{questionID}}",
};

const GETvariable: APIConfigType = {
  method: "GET",
  url: "/variable/{{variableID}}",
};

const APIConfig = {
  "/pageRoot": GETpageRoot,
  "/pageBySlug": GETpageSlug,
  "/questionByID": GETquestion,
  "/questionRoot": GETquestionRoot,
  "/variableByID": GETvariable,
};

export default APIConfig;

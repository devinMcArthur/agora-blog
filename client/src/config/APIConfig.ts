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

const GETquestion: APIConfigType = {
  method: "GET",
  url: "/question/{{questionID}}",
};

const APIConfig = {
  "/pageRoot": GETpageRoot,
  "/pageBySlug": GETpageSlug,
  "/questionByID": GETquestion,
};

export default APIConfig;

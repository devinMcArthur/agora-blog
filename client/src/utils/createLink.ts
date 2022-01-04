const questionLink = (slug: string) => {
  return `/q/${slug}`;
};

type PageQueryParams = {
  type: "edit-proposal";
  proposalId: string;
};

const pageLink = (slug: string, queryParams?: PageQueryParams) => {
  let paramString = "";
  if (queryParams)
    switch (queryParams.type) {
      case "edit-proposal": {
        paramString = `proposal=${queryParams.proposalId}`;
      }
    }

  return `/p/${slug}${!!paramString ? `?${paramString}` : ""}`;
};

const variableLink = (id: string) => {
  return `/v/${id}`;
};

const createLink = {
  questionLink,
  pageLink,
  variableLink,
};

export default createLink;

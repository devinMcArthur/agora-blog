import APIService from "../services/apiService";

import { PagePopulated } from "../typescript/interfaces/documents/Page";

export default function PageListService() {
  const getHomePages = () => {
    return new Promise<PagePopulated[]>((resolve, reject) => {
      APIService()
        .apiCall({ endpoint: "/pageRoot" })
        .then((res) => resolve(res.data.pages))
        .catch((err) => reject(err));
    });
  };

  return {
    getHomePages,
  };
}

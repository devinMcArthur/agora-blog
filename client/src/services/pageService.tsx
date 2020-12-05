import { PagePopulatedFull } from "../typescript/interfaces/documents/Page";
import APIService from "./apiService";

export default function PageService() {
  // Get page by slug
  const getPageBySlug = (pageSlug: string) => {
    return new Promise<PagePopulatedFull>((resolve, reject) => {
      APIService()
        .apiCall({
          endpoint: "/pageBySlug",
          options: { params: { pageSlug } },
        })
        .then((res) => resolve(res.data.page))
        .catch((err) => reject(err));
    });
  };

  return {
    getPageBySlug,
  };
}

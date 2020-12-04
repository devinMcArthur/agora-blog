import axios from "../mock/api";

import APIConfig from "../config/APIConfig";

export type APIObjectType = {
  endpoint: keyof typeof APIConfig;
  options?: {
    params: object;
  };
  body?: object;
};

export default function APIService() {
  // Mocks an API call
  const apiCall = (APIObject: APIObjectType) => {
    const requestObject = APIConfig[APIObject.endpoint];

    return axios({
      method: requestObject.method,
      url: requestObject.url,
      data: APIObject.body ? APIObject.body : null,
      params: APIObject.options?.params,
    });
  };

  return {
    apiCall,
  };
}

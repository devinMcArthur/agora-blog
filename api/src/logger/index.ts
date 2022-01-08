import winston from "winston";
import {
  ElasticsearchTransport,
  ElasticsearchTransportOptions,
} from "winston-elasticsearch";

const esTransportOpts: ElasticsearchTransportOptions = {
  level: "info",
  clientOpts: {
    node: "http://elasticsearch.kube-devops.svc:9200",
  },
};

const esTransport = new ElasticsearchTransport(esTransportOpts);

export const logger = winston.createLogger({
  transports: [esTransport],
});

/**
 * Compulsory error handling
 */

logger.on("error", (error) => {
  console.error("Error in logger caught", error);
});
esTransport.on("error", (error) => {
  console.error("Error in logger caught", error);
});

logger.on("data", (chunk) => {
  console.log("chunk", chunk);
});

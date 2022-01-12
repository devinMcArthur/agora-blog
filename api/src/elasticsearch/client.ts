import { Client } from "@elastic/elasticsearch";

const ElasticsearchClient = new Client({
  node:
    process.env.ELASTICSEARCH_URL ||
    "http://elasticsearch-client.kube-devops.svc:9200",
  auth: {
    username: (process.env.ELASTICSEARCH_USERNAME as string) || "elastic",
    password: (process.env.ELASTICSEARCH_PASSWORD as string) || "changeme",
  },
});

export default ElasticsearchClient;

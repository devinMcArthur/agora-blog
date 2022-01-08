import { Client } from "@elastic/elasticsearch";

const ElasticsearchClient = new Client({
  node: "http://elasticsearch.kube-devops.svc:9200",
});

export default ElasticsearchClient;

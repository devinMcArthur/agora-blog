# Development

## Docker Compose

- `docker-compose up`

## Skaffold

- `skaffold dev --port-forward`

# Production

## Elasticsearch

- `kubectl apply -f ./k8s-es/kube-devops.yaml`

- `kubectl apply -f ./k8s-es/es-master.yaml -f ./k8s-es/es-client.yaml -f ./k8s-es/es-data.yaml`

- Shell into `es-client` deployment and run `bin/elasticsearch-setup-passwords auto -b` and save the output from the command

- Create a secret containing the password for user `elastic`

- `kubectl create secret generic elasticsearch-secrets -n kube-devops --from-literal=password=<user-elastic-password>`

- `kubectl apply -f ./k8s-es/kibana.yaml`

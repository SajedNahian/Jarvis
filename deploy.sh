docker build -t sajednahian/code-execution-server:latest -t sajednahian/code-execution-server:$SHA -f ./code-execution-server/Dockerfile ./code-execution-server
docker build -t sajednahian/code-runner:latest -t sajednahian/code-runner:$SHA -f ./code-runner/Dockerfile ./code-runner

docker push sajednahian/code-execution-server:latest
docker push sajednahian/code-execution-server:$SHA 
docker push sajednahian/code-runner:latest
docker push sajednahian/code-runner:$SHA

kubectl apply -f k8s
kubectl set image deployments/code-execution-server-deployment code-exeuction-server=sajednahian/code-execution-server:$SHA
kubectl set image deployments/code-runner-deployment code-runner=sajednahian/code-runner:$SHA
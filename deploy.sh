docker build -t sajednahian/code-execution-server:latest -t sajednahian/code-execution-server:$SHA -f ./code-execution-server/Dockerfile ./code-execution-server

docker push sajednahian/code-execution-server:latest
docker push sajednahian/code-execution-server:$SHA 
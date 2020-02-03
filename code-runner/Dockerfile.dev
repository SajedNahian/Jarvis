FROM harisekhon/ubuntu-java

RUN \
  apt-get -y update && \
  apt-get -y install python curl \
  && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
  && apt-get install -y nodejs

WORKDIR  /app
COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "start"]
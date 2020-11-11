FROM lambci/lambda:build-nodejs8.10
ENV AWS_DEFAULT_REGION eu-central-1
RUN npm install -g typescript@2.6.2 claudia
RUN mkdir -p /app
WORKDIR /app
CMD [ "./bin/install.sh" ]
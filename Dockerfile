FROM node:8.11.3
  
WORKDIR /app
ADD . /app

RUN npm -q install
RUN npm -q install -g ember-cli
RUN ember install ember-paper

EXPOSE 4200  

CMD [ "ember", "server", "--live-reload=false" ]

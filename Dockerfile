FROM node:20

ENV PORT=1234

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE $PORT

VOLUME [ "/usr/src/app" ]

CMD npm start -- --port $PORT --host 0.0.0.0
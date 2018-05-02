FROM node:carbon

WORKDIR /home/node/app

COPY package.json package.json

RUN npm install

COPY . .

WORKDIR /home/node/app/santo-clos-front

RUN npm install

RUN npm run build

RUN ls -la

RUN ls -la dist/

WORKDIR /home/node/app

EXPOSE 8080

ENTRYPOINT ["npm", "run"]
CMD ["start"]
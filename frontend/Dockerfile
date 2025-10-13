FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm@latest

RUN npm i

COPY . .

RUN npm run build

CMD ["cp", "-r", "dist result",_"dist"]
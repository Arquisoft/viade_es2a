FROM node:12.14.1
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm install -g http-server
CMD http-server build -p 3000
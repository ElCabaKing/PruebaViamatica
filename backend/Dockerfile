# Simple development Dockerfile for backend
# uses Node alpine for compact size

FROM node:20-alpine

WORKDIR /app

# copy dependency definitions first to leverage caching
COPY package*.json ./

RUN npm install

# copy rest of source
COPY . .

# default command runs dev server (tsx watch)
CMD ["npm", "run", "dev"]

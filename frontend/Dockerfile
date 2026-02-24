# Simple development Dockerfile for frontend
# based on current Next.js requirements

FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# expose the dev port
EXPOSE 3000

CMD ["npm", "run", "dev"]

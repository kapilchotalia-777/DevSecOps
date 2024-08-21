# Stage 1: Build stage
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Stage 2: Production stage
FROM node:16-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "app.js"]

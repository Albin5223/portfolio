FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 5173

# Monter le code local pour hot reload
VOLUME /app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

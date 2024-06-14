# Node image
FROM node:22.2-alpine

# Set workdir
WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

# Build app
RUN npm run build

EXPOSE 3000

# Start app
CMD ["npm", "start"]

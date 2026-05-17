# Use Node 20 runtime environment
FROM node:20

WORKDIR /app

# Copy dependency mappings and install them inside the isolated container
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code (including proxy.conf.json)
COPY . .

EXPOSE 4200

# Spin up the development server bound to 0.0.0.0 to expose it to your Mac's browser
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--proxy-config", "proxy.conf.json"]
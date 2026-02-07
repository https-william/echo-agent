# Use a light Node image
FROM node:22-alpine

# Install git (required for some npm dependencies)
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install local dependencies
RUN npm install --omit=dev

# Copy the rest of the workspace
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 18789

# Start command
CMD ["sh", "-c", "npx serve -p 3000 . & node -e \"console.log('Echo Cloud Active (with Git)')\" && sleep infinity"]

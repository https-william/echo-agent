# Use a stable Node image
FROM node:22-alpine

# Install ALL build tools (Overkill Mode)
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++ \
    build-base

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

# Start command (more robust sequence)
CMD ["sh", "-c", "npx serve -p 3000 . & node -e \"console.log('Echo Cloud: Overkill Mode Active')\" && sleep infinity"]

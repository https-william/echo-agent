# Use a stable Debian-based Node image (more compatible than Alpine)
FROM node:22-bookworm-slim

# Install required build tools
RUN apt-get update && apt-get install -y \
    git \
    python3 \
    make \
    g++ \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies (skipping optional native builds to save time/memory)
RUN npm install --omit=dev --ignore-scripts

# Copy the rest of the workspace
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 18789

# Start command
CMD ["sh", "-c", "npx serve -p 3000 . & node -e \"console.log('Echo Cloud: Debian Mode Active')\" && sleep infinity"]

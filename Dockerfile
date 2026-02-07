FROM node:22-slim

# Install OpenClaw globally
RUN npm install -g openclaw

# Set working directory
WORKDIR /app

# Copy workspace files
COPY . .

# Expose gateway port
EXPOSE 18789
EXPOSE 3000

# Start the gateway
# Note: In a real deployment, we'd need to handle auth tokens securely.
# For now, we'll start it in a way that it can be configured.
CMD ["openclaw", "gateway", "start", "--port", "18789", "--bind", "0.0.0.0"]

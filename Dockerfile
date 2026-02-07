FROM node:22-slim

# Install OpenClaw globally
RUN npm install -g openclaw --unsafe-perm

# Set working directory
WORKDIR /app

# Copy package.json first to cache dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the workspace
COPY . .

# Environment variables (placeholders)
ENV GATEWAY_PORT=18789
ENV DASHBOARD_PORT=3000

# Expose ports
EXPOSE 18789
EXPOSE 3000

# Start command
CMD ["sh", "-c", "openclaw gateway start --port $GATEWAY_PORT --bind 0.0.0.0 & npx serve -p $DASHBOARD_PORT ."]

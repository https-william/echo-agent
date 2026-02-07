# Use a light Node image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only what's needed for dependencies first
COPY package.json ./

# Install local dependencies only (no global installs)
RUN npm install --omit=dev

# Copy the rest of the workspace
COPY . .

# Expose the dashboard and gateway ports
EXPOSE 3000
EXPOSE 18789

# Run a simple shell script to start the processes
# alpine uses 'sh' instead of 'bash'
CMD ["sh", "-c", "npx serve -p 3000 . & node -e \"console.log('Echo Cloud Node Active')\" && sleep infinity"]

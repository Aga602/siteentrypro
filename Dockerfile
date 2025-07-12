# Stage 1: Dependencies and Build
FROM node:20-slim AS base
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM node:20-slim AS production
WORKDIR /app

# Copy built files from the build stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

# Start the Next.js application
CMD ["node", "server.js"]

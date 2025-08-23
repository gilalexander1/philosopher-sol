# Dockerfile
# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.18.0
ARG ALPINE_VERSION=3.18

################################################################################
# Use node as the base image for the build stage.
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build

# Set the working directory.
WORKDIR /app

# Disable Next.js telemetry.
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Copy the package.json, and package-lock.json files to the working directory.
COPY package.json package-lock.json ./

# Install dependencies.
RUN npm ci

# Copy the rest of the source code to the working directory.
COPY . .

# Build the Next.js application.
RUN npm run build

################################################################################
# Use node as the base image for the production stage.
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

# Set the working directory.
WORKDIR /app

# Disable Next.js telemetry.
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user to run the application.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public directory from the build stage.
COPY --from=build /app/public ./public

# Copy the standalone output from the build stage.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user.
USER nextjs

# Expose the port that the application will run on.
EXPOSE 3000

# Set the environment variable for the port.
ENV PORT 3000

# Start the application.
CMD ["node", "server.js"]

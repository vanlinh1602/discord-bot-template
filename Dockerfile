FROM node:20-alpine AS builder
WORKDIR /app

# Install all dependencies (dev + prod) for building
COPY package.json .
RUN npm install

# Copy source and build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json .
RUN npm install --omit=dev

# Copy compiled app
COPY --from=builder /app/dist ./dist

# Copy environment files for dotenv-flow (ensure at least one exists)
COPY .env* ./

# Run the bot
CMD ["node", "dist/index.js"]


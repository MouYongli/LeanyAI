# base image
FROM node:23-alpine AS base

RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# install dependencies and build
FROM base AS builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY . .

# 在构建阶段添加 ARG
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm build

# production stage
FROM base AS production
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
CMD ["pnpm", "start"]

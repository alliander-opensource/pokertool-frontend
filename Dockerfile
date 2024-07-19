FROM node:22.4-alpine AS build

COPY . /app

WORKDIR /app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

RUN npm install -g @angular/cli

RUN ng build --output-path dist

FROM nginx:alpine-slim

COPY --from=build /app/dist/browser /usr/share/nginx/html

EXPOSE 80

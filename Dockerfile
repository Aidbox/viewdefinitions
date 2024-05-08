FROM clojure:temurin-21-tools-deps-alpine as builder

WORKDIR /app
COPY ./ /app/

RUN apk add --update alpine-sdk npm
RUN npm install
RUN npx shadow-cljs release app


FROM caddy:alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/resources/client/public /usr/share/caddy

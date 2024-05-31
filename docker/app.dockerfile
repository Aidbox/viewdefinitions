FROM clojure:temurin-22-tools-deps-bullseye-slim as builder

WORKDIR /app
COPY ./ /app/

RUN apt update && apt install curl rlwrap -y

ENV NODE_MODE=production
RUN curl -fs https://deb.nodesource.com/setup_20.x | bash -
RUN apt install nodejs -y
RUN npm install -g postcss postcss-cli
RUN npm ci --omit=dev
RUN npx shadow-cljs release app

RUN clj -T:server:server-build uber


FROM openjdk:23-slim-bullseye

COPY --from=builder /app/out/vd-designer.jar ./server.jar

CMD [ "java", "-XX:+UseContainerSupport", "-jar", "./server.jar"]

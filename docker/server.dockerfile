FROM clojure:temurin-22-tools-deps-bullseye-slim as builder

WORKDIR /app
COPY ./ /app/

RUN apt update && apt install rlwrap -y
RUN clj -T:server:server-build uber


FROM openjdk:23-slim-bullseye
COPY --from=builder /app/out/vd-designer-standalone.jar ./server.jar

CMD [ "java", "-XX:+UseContainerSupport", "-jar", "./server.jar"]

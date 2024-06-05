
client-init:
	npm install

client-build:
	clj -M:client:client-build

client-build-tests:
	clj -M:client:client-test:client-build-tests

client-build-all: client-build client-build-tests

client-repl: client-init
	rm -rf ./.shadow-cljs
	clj -M:client:client-test:client-repl

client-test: client-build-tests
	node out/node-tests.js

server-test:
	clj -M:server:server-test -m kaocha.runner

server-repl:
	source ./.env && clj -M:server:server-test:nrepl

up:
	docker compose --profile local up

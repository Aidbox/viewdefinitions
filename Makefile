
init:
	npm install

build:
	clj -M:client:client-build

build-tests:
	clj -M:client:client-test:client-build-tests

build-all: build build-tests

client-repl: init
	rm -rf ./.shadow-cljs
	clj -M:client:client-test:client-repl

test: build-tests
	node out/node-tests.js

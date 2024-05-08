
init:
	npm install

build:
	clj -M:client:client-build

build-tests:
	clj -M:client:client-build-tests

build-all: build build-tests

shadow: init
	rm -rf ./.shadow-cljs
	clj -M:client:client-test:shadow

test: build-tests
	node out/node-tests.js

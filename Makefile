
init:
	npm install

build:
	clj -M:build

build-tests:
	clj -M:build-tests

build-all: build build-tests

shadow: init
	rm -rf ./.shadow-cljs
	clj -M:shadow


init:
	npm install

shadow: init
	rm -rf ./.shadow-cljs
	clj -M:shadow

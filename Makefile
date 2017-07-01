install:
	yarn
	npm run flow-typed install

docs:
	mkdir -p docs
	npm run documentation -- build src/index.js -f md > docs/README.md

build:
	rm -rf dist
	mkdir dist
	npm run build

test:
	npm run test

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test docs

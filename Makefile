install:
	npm install

docs:
	mkdir -p docs
	npm run documentation -- build src/index.js -f md > docs/README.md

build:
	rm -rf dist
	mkdir dist
	npm build

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test docs

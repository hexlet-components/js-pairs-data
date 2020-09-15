install:
	npm install

docs:
	mkdir -p docs
	npm run documentation -- build src/index.js -f md > docs/README.md

test:
	npm test -s

lint:
	npx eslint .

publish:
	npm publish --access public

.PHONY: test docs

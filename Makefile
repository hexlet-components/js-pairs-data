install:
	pnpm install

docs:
	mkdir -p docs
	pnpm --silent run documentation > docs/README.md

test:
	pnpm --silent test

lint:
	pnpm --silent run typecheck
	pnpm --silent run lint
	pnpm --silent run format:check

lint-fix:
	pnpm run lint:fix

publish:
	pnpm publish --access public --no-git-checks

update-deps:
	pnpm exec ncu -u

.PHONY: test docs

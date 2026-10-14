# ---------------------------------------------------------
# Smarter Chat for Shopify. See README.md and CLAUDE.md.
# ---------------------------------------------------------
SHELL := /bin/bash
# The developer's shell may export NODE_ENV=production, which makes npm skip devDependencies.
NPM_INSTALL := npm install --include=dev
# pre-commit and codespell are installed into venv/ (requirements/local.txt).
PYTHON ?= python3.13
VENV_BIN := venv/bin

.PHONY: all init python-init test lint format embed-version clean pre-commit-run help

all: help

init: python-init
	$(NPM_INSTALL)
	$(VENV_BIN)/pre-commit install

python-init:
	[ -x $(VENV_BIN)/python ] || $(PYTHON) -m venv venv
	$(VENV_BIN)/pip install --upgrade pip
	$(VENV_BIN)/pip install -r requirements/local.txt

test:
	npm test
	npm run theme-check

lint:
	npm run lint

format:
	npm run format

# make embed-version V=0.9.1
embed-version:
	npm run embed-version -- $(V)

pre-commit-run:
	$(VENV_BIN)/pre-commit run --all-files

clean:
	rm -rf node_modules venv build .shopify

help:
	@echo '===================================================================='
	@echo 'Smarter Chat for Shopify'
	@echo '===================================================================='
	@echo 'init            - npm dev dependencies, venv/, pre-commit hooks'
	@echo 'python-init     - venv/ with pre-commit and codespell (requirements/local.txt)'
	@echo 'test            - Vitest (rendering and schema), then Theme Check'
	@echo 'lint            - ESLint and Prettier (with the Liquid plugin)'
	@echo 'embed-version   - pin the embed script: make embed-version V=0.9.1'
	@echo 'pre-commit-run  - every pre-commit hook on every file'
	@echo 'clean           - remove dependencies, venv/ and build output'
	@echo ''
	@echo 'The app owner, not CI: npx shopify app dev / npx shopify app deploy'

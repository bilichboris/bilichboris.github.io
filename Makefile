SHELL := /usr/bin/env bash

HOST ?= 127.0.0.1
PORT ?= 4000
LIVERELOAD_PORT ?= 35730
PODMAN_COMPOSE ?= $(shell command -v podman-compose >/dev/null 2>&1 && echo podman-compose || echo "podman compose")
COMPOSE_FILE ?= docker-compose.yml
OBSERVER_LIB ?= $(shell ruby -e "spec = Gem::Specification.find_all_by_name('observer').first; print(spec ? File.join(spec.full_gem_path, 'lib') : '')")
JEKYLL_RUN = RUBYLIB="$(if $(OBSERVER_LIB),$(OBSERVER_LIB):)$$RUBYLIB" bundle exec jekyll

.PHONY: help setup-local check-observer preview-local preview-live build-local preview-podman stop-podman clean

help:
	@echo "Targets:"
	@echo "  make setup-local    Install local Ruby/Node dependencies"
	@echo "  make preview-local  Run Jekyll locally (stable preview)"
	@echo "  make preview-live   Run Jekyll locally with live reload"
	@echo "  make build-local    Build site locally (pre-push check)"
	@echo "  make preview-podman Run site in a Podman container"
	@echo "  make stop-podman    Stop Podman preview stack"
	@echo "  make clean          Remove local build/cache output"

setup-local:
	@./bin/setup-dev.sh

check-observer:
	@if [ -z "$(OBSERVER_LIB)" ]; then \
		echo "Missing 'observer' gem in system Ruby. Install with: gem install observer"; \
		exit 1; \
	fi

preview-local: check-observer
	$(JEKYLL_RUN) serve --incremental --host $(HOST) --port $(PORT) --force_polling

preview-live: check-observer
	$(JEKYLL_RUN) serve --livereload --livereload-port $(LIVERELOAD_PORT) --incremental --host $(HOST) --port $(PORT) --force_polling

build-local: check-observer
	$(JEKYLL_RUN) build

preview-podman:
	$(PODMAN_COMPOSE) -f $(COMPOSE_FILE) up --build

stop-podman:
	$(PODMAN_COMPOSE) -f $(COMPOSE_FILE) down

clean:
	rm -rf _site .jekyll-cache .jekyll-metadata

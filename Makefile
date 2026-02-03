.PHONY: help install dev build start lint typecheck format check clean docker-build docker-run docker-stop docker-logs

# Variables
DOCKER_IMAGE := portfolio
DOCKER_CONTAINER := portfolio
DOCKER_COMPOSE := docker-compose

help:
	@echo "Portfolio Development Makefile"
	@echo ""
	@echo "Core:"
	@echo "  make install        Install dependencies"
	@echo "  make dev            Start development server"
	@echo "  make build          Build for production"
	@echo "  make start          Start production server"
	@echo ""
	@echo "Quality:"
	@echo "  make lint           Run ESLint"
	@echo "  make typecheck      Run TypeScript compiler"
	@echo "  make format         Format code with Prettier"
	@echo "  make check          Run all checks (lint + typecheck + format)"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-build   Build Docker image"
	@echo "  make docker-run     Run Docker containers (docker-compose up)"
	@echo "  make docker-stop    Stop Docker containers"
	@echo "  make docker-logs    View Docker logs"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean          Remove build artifacts and dependencies"

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

start:
	npm start

lint:
	npm run lint

typecheck:
	npm run typecheck

format:
	npm run format

check: lint typecheck format

docker-build:
	docker build -t $(DOCKER_IMAGE) .

docker-run: docker-build
	$(DOCKER_COMPOSE) up -d

docker-stop:
	$(DOCKER_COMPOSE) down

docker-logs:
	$(DOCKER_COMPOSE) logs -f

clean:
	rm -rf node_modules
	rm -rf .next
	rm -rf out
	rm -rf dist
	npm cache clean --force

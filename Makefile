override SHELL := /bin/bash

.PHONY: help
help: ## Show this help message.
	@echo 'Usage:'
	@echo '  make [target] ...'
	@echo
	@echo 'Targets:'
	@grep --no-filename -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	 sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: ## Create docker image with dependencies needed for development.
	docker-compose build

.PHONY: cleanup
cleanup: ## Delete image timetracker_ui
	docker rmi timetracker_ui

.PHONY: run
run: ## Execute timetracker_ui docker containe.
	docker-compose --env-file ./.env up -d

.PHONY: logs
logs: ## Show logs of timetracker_ui.
	docker logs -f timetracker_ui

.PHONY: stop
stop: ## Stop container timetracker_ui.
	docker-compose stop	

.PHONY: restart
restart: ## Restart container timetracker_ui.
	docker-compose stop	
	docker-compose up -d

.PHONY: remove
remove: ## Delete container timetracker_ui.
	docker-compose down --volumes --remove-orphans --rmi local

.PHONY: test
test: ## Run all tests on docker container timetracker_ui.
	docker-compose --env-file ./.env up -d
	docker exec -it timetracker_ui bash -c "npm run test"

.PHONY: publish
publish: ## Publish the container image timetracker_ui.
	docker tag timetracker_ui:latest $(registry_url)/timetracker_ui:latest
	docker push $(registry_url)/timetracker_ui:latest

.PHONY: build_prod
build_prod: ## Create docker image with dependencies needed for production.
	docker build --target production -t timetracker_ui_prod -f Dockerfile .

.PHONY: run_prod
run_prod: ## Execute timetracker_ui_prod docker container.
	docker run -d -p 4200:4200 --name timetracker_ui_prod timetracker_ui_prod 

.PHONY: stop_prod
stop_prod: ## Stop container timetracker_ui_prod.
	docker stop timetracker_ui_prod

.PHONY: remove_prod
remove_prod: ## Delete container timetracker_ui_prod.
	docker stop timetracker_ui_prod
	docker rm timetracker_ui_prod

.PHONY: publish_prod
publish_prod: ## Publish the container image timetracker_ui_prod.
	docker tag timetracker_ui_prod:latest $(registry_url)/timetracker_ui_prod:latest
	docker push $(registry_url)/timetracker_ui_prod:latest

.PHONY: login
login: ## Login in respository of docker images.
	az acr login --name $(container_registry)

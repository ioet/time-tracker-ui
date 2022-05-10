override SHELL := /bin/bash

.PHONY: help
help: ## Show this help message.
	@echo 'Usage:'
	@echo '  make [target] ...'
	@echo
	@echo 'Targets:'
	@grep --no-filename -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	 sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build_dev
build_dev: ## Create docker image with dependencies needed for development.
	docker-compose build timetracker_ui_dev

.PHONY: cleanup
cleanup: ## Delete image timetracker_ui
	docker rmi timetracker_ui

.PHONY: run
run: ## Execute timetracker_ui dev docker containe.
	docker-compose up -d timetracker_ui_dev

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
test: ## Run all tests on docker container timetracker_ui at the CLI.
	docker-compose -f docker-compose.yml up -d
	docker exec timetracker_ui bash -c "npm run ci-test"

.PHONY: testdev
testdev: ## Run all tests on docker container timetracker_ui at the Dev
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
	docker exec timetracker_ui bash -c "npm run ci-test"

.PHONY: publish
publish: require-acr-arg require-image_tag-arg ## Upload a docker image to the stage azure container registry acr=<name_of_the_azure_container_registry> image_tag=<tag_for_the_image>
	docker tag timetracker_ui:latest $(acr).azurecr.io/timetracker_ui:$(image_tag)
	docker push $(acr).azurecr.io/timetracker_ui:$(image_tag)

.PHONY: build_prod
build_prod: ## Create docker image with dependencies needed for production.
	docker-compose build timetracker_ui_prod

.PHONY: run_prod
run_prod: ## Execute timetracker_ui_prod docker container.
	docker run -d -p 80:80 --env-file ./.env --name timetracker_ui_prod timetracker_ui_prod

.PHONY: stop_prod
stop_prod: ## Stop container timetracker_ui_prod.
	docker stop timetracker_ui_prod

.PHONY: remove_prod
remove_prod: ## Delete container timetracker_ui_prod.
	docker stop timetracker_ui_prod
	docker rm timetracker_ui_prod

.PHONY: publish_prod
publish_prod: ## Upload a docker image to the prod azure container registry acr=<name_of_the_azure_container_registry> image_tag=<tag_for_the_image>
	docker tag timetracker_ui_prod:latest $(acr).azurecr.io/timetracker_ui:$(image_tag)
	docker push $(acr).azurecr.io/timetracker_ui:$(image_tag)

.PHONY: login
login: ## Login in respository of docker images.
	az acr login --name $(acr)

.PHONY: release
release: require-VERSION-arg require-COMMENT-arg ## Creates an pushes a new tag.
	git tag -a ${VERSION} -m "${COMMENT}"
	git push origin ${VERSION}

require-%-arg:
	@if [ -z ${${*}} ]; then \
          echo "ERROR: [$*] argument is required, e.g. $*=<value>"; \
          exit 1; \
        fi

require-%-tool:
	@if [ "$(shell command -v ${*} 2> /dev/null)" = "" ]; then \
          echo "ERROR: [$*] not found"; \
          exit 1; \
        fi

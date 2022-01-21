.PHONY: help
help:
	@echo "---------------HELP-----------------"
	@echo "- make build --> Create docker image with dependencies needed"
	@echo "- make run --> Execute timetracker_ui docker container"
	@echo "- make stop --> Stop container"
	@echo "- make remove --> Restart container"
	@echo "- make remove --> Delete container"
	@echo "- make test --> Run all tests on docker container"
	@echo "- make login --> Login in respository of docker images"
	@echo "- make publish --> Publish the container image"
	@echo "------------------------------------"

.PHONY: build
build:
	-docker rmi timetracker_ui
	docker build -t timetracker_ui -f Dockerfile .

.PHONY: run
run:
	docker-compose --env-file ./.env up -d
	docker logs -f timetracker_ui

.PHONY: stop
stop:
	docker-compose stop	

.PHONY: restart
restart:
	docker-compose stop	
	docker-compose up -d
	docker logs -f timetracker_ui

.PHONY: remove
remove:
	docker-compose down

.PHONY: test
test:
	docker-compose --env-file ./.env up -d
	docker exec -it timetracker_ui bash -c "npm test"

.PHONY: login
login:
	az acr login --name timetrackerdevregistry

.PHONY: publish
publish:
	docker tag timetracker_ui:latest timetrackerdevregistry.azurecr.io/timetracker_ui:latest
	docker push timetrackerdevregistry.azurecr.io/timetracker_ui:latest

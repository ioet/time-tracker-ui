.PHONY: help
help:
	@echo "---------------HELP-----------------"
	
	@echo "- make build --> Create docker image with dependencies needed for development"
	@echo "- make run --> Execute timetracker_ui docker container"
	@echo "- make stop --> Stop container timetracker_ui"
	@echo "- make restart --> Restart container timetracker_ui"
	@echo "- make remove --> Delete container timetracker_ui"
	@echo "- make test --> Run all tests on docker container timetracker_ui"
	@echo "- make publish --> Publish the container image timetracker_ui"

	@echo "- make build_prod --> Create docker image with dependencies needed for production"
	@echo "- make run_prod --> Execute timetracker_ui_prod docker container"
	@echo "- make remove_prod --> Delete container timetracker_ui_prod"
	@echo "- make publish_prod --> Publish the container image timetracker_ui_prod"

	@echo "- make login --> Login in respository of docker images"
	@echo "------------------------------------"

.PHONY: build
build:
	-docker rmi timetracker_ui
	docker-compose build

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
	docker exec -it timetracker_ui bash -c "npm run test"

.PHONY: publish
publish:
	docker tag timetracker_ui:latest timetrackerdevregistry.azurecr.io/timetracker_ui:latest
	docker push timetrackerdevregistry.azurecr.io/timetracker_ui:latest

.PHONY: build_prod
build_prod:
	-docker rmi timetracker_ui_prod
	docker build --target production -t timetracker_ui_prod -f Dockerfile .

.PHONY: run_prod
run_prod:
	docker run -d -p 4200:4200 --name timetracker_ui_prod timetracker_ui_prod 
	docker logs -f timetracker_ui_prod

.PHONY: remove_prod
remove_prod:
	docker stop timetracker_ui_prod
	docker rm timetracker_ui_prod

.PHONY: publish_prod
publish_prod:
	docker tag timetracker_ui_prod:latest timetrackerdevregistry.azurecr.io/timetracker_ui_prod:latest
	docker push timetrackerdevregistry.azurecr.io/timetracker_ui_prod:latest

.PHONY: login
login:
	az acr login --name timetrackerdevregistry
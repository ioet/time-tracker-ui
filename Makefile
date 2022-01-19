.PHONY: help
help:
	@echo "---------------HELP-----------------"
	@echo "- make build --> Create docker image with dependencies needed"
	@echo "- make run --> Execute docker container database from postgres, and api from image created previusly"
	@echo "- make stop --> Stop container"
	@echo "- make remove --> Delete container"
	@echo "------------------------------------"

.PHONY: build
build:
	-docker rmi timetracker_ui
	docker build -t timetracker_ui -f Dockerfile .

.PHONY: run
run:
	docker-compose up -d
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

#!/usr/bin/sh
echo "Deploying $1..."
docker ps -aq | xargs docker stop| xargs docker rm --force --volumes
docker system prune -af
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 568748651446.dkr.ecr.us-east-1.amazonaws.com
docker run -d --name timetracker_ui -p 80:80 568748651446.dkr.ecr.us-east-1.amazonaws.com/time-tracker/$2-ui:$1

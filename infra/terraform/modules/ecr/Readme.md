# Smartbirds Images 

### Telegram Bot

```bash
cd microservices/bot
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 211125718438.dkr.ecr.eu-central-1.amazonaws.com
docker build -t smartbirds-dev .
docker tag smartbirds-dev:latest 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-dev:latest
docker push 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-dev:latest
```
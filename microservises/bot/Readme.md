# Smartbirds Images 

### Telegram Bot

```bash
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 211125718438.dkr.ecr.eu-central-1.amazonaws.com
docker build --platform linux/amd64 -t smartbirds-dev .
docker tag smartbirds-dev:latest 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-dev:latest
docker push 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-dev:latest
```

### Run
with env variables: TELEGRAM_BOT_TOKEN="your_token"

```bash
export TELEGRAM_BOT_TOKEN="your_token"
docker run -e TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN 211125718438.dkr.ecr.eu-central-1.amazonaws.com/smartbirds-dev:latest
``` 
locals {
  random_string = random_string.random_string.result
}

resource "random_string" "random_string" {
  length  = 4
  special = false
}

resource "aws_secretsmanager_secret" "telegram_bot_token" {
  name        = "${var.secret_name}-${local.random_string}"
  description = "Telegram Bot Token for SmartBirds"

  tags = {
    Name = "telegram-bot-token"
  }
}

resource "aws_secretsmanager_secret_version" "telegram_bot_token" {
  secret_id     = aws_secretsmanager_secret.telegram_bot_token.id
  secret_string = var.telegram_bot_token
}

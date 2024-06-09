module "ecr" {
  source = "./modules/ecr"
  name = var.name
}

locals {
  table_name = "${var.name}-users"
}

module "users_table" {
  source       = "./modules/dynamodb"
  table_name   = local.table_name
  hash_key     = "username"
  hash_key_type = "S"
}

module "secret" {
  source = "./modules/secret"

  secret_name      = "telegram-bot-token"
  telegram_bot_token = var.telegram_bot_token
}

resource "aws_security_group" "ecs_service" {
  name = "${var.name}-ecs-sg"
  vpc_id = module.network.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.name}-ecs-sg"
  }
}

module "telegram_bot" {
  source = "./modules/ecs"

  name              = var.name
  region            = var.region
  docker_image      = var.docker_image
  subnets           = module.network.public_subnets
  security_groups   = [aws_security_group.ecs_service.id]

  environment_variables       = {
    TABLE_NAME = local.table_name
    SECRET_ARN = module.secret.secret_arn
    REGION     = var.region
  }
}
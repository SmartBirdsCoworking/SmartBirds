module "users_table" {
  source       = "./modules/dynamodb"
  table_name   = "${var.name}-users"
  hash_key     = "username"
  hash_key_type = "S"
}

module "secret" {
  source = "./modules/secret"

  secret_name      = "telegram-bot-token"
  telegram_bot_token = var.telegram_bot_token
}

module "telegram_bot" {
  source = "./modules/ecs_task"

  name              = var.name
  task_name     = "telegram-bot"
  region            = var.region
  aws_ecs_cluster_id = module.ecs.ecs_cluster_id
  docker_image      = var.telegram_bot_image
  subnets           = var.create_nat_gateway ? module.network.private_subnets : module.network.public_subnets
  assign_public_ip  = var.create_nat_gateway ? false : true
  security_groups   = [aws_security_group.ecs_service.id]
  ecs_execution_role = module.ecs.ecs_execution_role_arn
  cloudwatch_group_name = module.ecs.cloudwatch_log_group_name

  environment_variables       = {
    TABLE_NAME = "${var.name}-users"
#    SECRET_ARN = module.secret.secret_arn
    AWS_REGION     = var.region
    TELEGRAM_BOT_TOKEN = var.telegram_bot_token
  }
}
output "vpc_id" {
  value = module.network.vpc_id
}

output "public_subnets" {
  value = module.network.public_subnets
}


output "telegram_bot_secret_arn" {
  description = "The ARN of the Telegram bot secret"
  value       = module.secret.secret_arn
}


output "telegram_bot_ecs_service_name" {
  description = "The name of the ECS service"
  value       = module.telegram_bot.ecs_service_name
}

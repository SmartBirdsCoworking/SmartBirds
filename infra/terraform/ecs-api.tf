module "partners_table" {
  source       = "./modules/dynamodb"
  table_name   = "${var.name}-partners"
  hash_key     = "partners"
  hash_key_type = "S"
}

module "api" {
  source = "./modules/ecs_task"

  name              = var.name
  task_name     = "api"
  region            = var.region
  aws_ecs_cluster_id = module.ecs.ecs_cluster_id
  docker_image      = var.api_image
  subnets           = var.create_nat_gateway ? module.network.private_subnets : module.network.public_subnets
  assign_public_ip  = var.create_nat_gateway ? false : true
  security_groups   = [aws_security_group.ecs_service.id]
  ecs_execution_role = module.ecs.ecs_execution_role_arn
  cloudwatch_group_name = module.ecs.cloudwatch_log_group_name
  port          = 3000

  environment_variables       = {
    TABLE_NAME = "${var.name}-partners"
    AWS_REGION     = var.region
  }
}
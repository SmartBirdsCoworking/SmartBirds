resource "aws_ecs_task_definition" "ecs_task" {
  family                   = "${var.name}-miniapp"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048

  execution_role_arn =  module.ecs.ecs_execution_role_arn
  task_role_arn =   module.ecs.ecs_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "${var.name}-container"
      image     =  var.miniapp_image
      essential = true
      portMappings = [
        {
          containerPort = 3001
          hostPort      = 3001
        }
      ]
      environment = [
        {
          TABLE_NAME     = "${var.name}-partners"
          AWS_REGION     = var.region
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = module.ecs.cloudwatch_log_group_name
          awslogs-region        = var.region
          awslogs-stream-prefix = "miniapp"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "ecs_service" {
  name            = "${var.name}-miniapp"
  cluster         = module.ecs.ecs_cluster_id
  task_definition = aws_ecs_task_definition.ecs_task.arn
  desired_count   = 1

  network_configuration {
    subnets          = var.create_nat_gateway ? module.network.private_subnets : module.network.public_subnets
    security_groups  =  [aws_security_group.ecs_service.id]
    assign_public_ip = var.create_nat_gateway ? false : true
  }

  launch_type = "FARGATE"
}

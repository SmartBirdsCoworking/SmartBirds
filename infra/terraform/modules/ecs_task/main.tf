provider "aws" {
  region = var.region
}

resource "aws_ecs_task_definition" "ecs_task" {
  family                   = "${var.name}-${var.task_name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  execution_role_arn = var.ecs_execution_role
  task_role_arn =  var.ecs_execution_role

  container_definitions = jsonencode([
    {
      name      = "${var.name}-container"
      image     = var.docker_image
      essential = true
      portMappings = [
        {
          containerPort = var.port
          hostPort      = var.port
        }
      ]
      environment = [
        for k, v in var.environment_variables : {
          name  = k
          value = v
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = var.cloudwatch_group_name
          awslogs-region        = var.region
          awslogs-stream-prefix = var.task_name
        }
      }
    }
  ])
}

resource "aws_ecs_service" "ecs_service" {
  name            = "${var.name}-${var.task_name}"
  cluster         = var.aws_ecs_cluster_id
  task_definition = aws_ecs_task_definition.ecs_task.arn
  desired_count   = 1

  network_configuration {
    subnets          = var.subnets
    security_groups  = var.security_groups
    assign_public_ip = var.assign_public_ip
  }

  launch_type = "FARGATE"

}


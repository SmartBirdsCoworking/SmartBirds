### ECS

module "ecs" {
  source = "./modules/ecs"
  name = var.name
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


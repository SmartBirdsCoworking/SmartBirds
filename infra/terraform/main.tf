terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.region
}

provider "random" {}

module "network" {
  source = "./modules/network"
  cidr_block           = var.vpc_cidr_block
  name                 = var.name
  availability_zones   = var.availability_zones
  create_nat_gateway   = var.create_nat_gateway
}

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


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



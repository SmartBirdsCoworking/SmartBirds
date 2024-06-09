terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.region
}


module "network" {
  source = "./modules/network"
  cidr_block           = var.vpc_cidr_block
  name                 = var.name
  availability_zones   = var.availability_zones
  create_nat_gateway   = false
}


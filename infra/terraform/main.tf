terraform {
  backend "s3" {}
}

provider "aws" {
  region = var.region
}


module "vpc" {
  source = "./modules/network"

  cidr_block           = var.vpc_cidr_block
  vpc_name             = var.vpc_name
  public_subnets_count = var.public_subnets_count
  public_subnets_cidrs = var.public_subnets_cidrs
}

module "dynamodb" {
  source       = "./modules/dynamodb"
  table_name   = var.dynamodb_table_name
  hash_key     = var.dynamodb_hash_key
  hash_key_type = var.dynamodb_hash_key_type
}

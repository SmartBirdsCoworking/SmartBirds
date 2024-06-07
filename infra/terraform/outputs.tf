output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "dynamodb_table_id" {
  value = module.dynamodb.dynamodb_table_id
}

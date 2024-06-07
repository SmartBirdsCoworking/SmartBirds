variable "region" {
  default = ""
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
}

variable "public_subnets_count" {
  description = "Number of public subnets"
  type        = number
}

variable "public_subnets_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
}

variable "dynamodb_hash_key" {
  description = "Hash key for the DynamoDB table"
  type        = string
}

variable "dynamodb_hash_key_type" {
  description = "Type of the hash key"
  type        = string
}

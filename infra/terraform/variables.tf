variable "region" {
  default = ""
}

variable "name" {
  description = "Name of the project"
  type        = string
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "telegram_bot_token" {
  description = "The Telegram bot token"
  type        = string
}

variable "docker_image" {
  description = "The Docker image for the mini-app"
  type        = string
  default = ""
}

variable "database_url" {
  description = "The URL for the database"
  type        = string
  default = ""
}

variable "subnets" {
  description = "List of subnets for the ECS service"
  type        = list(string)
  default = []
}

variable "security_groups" {
  description = "List of security groups for the ECS service"
  type        = list(string)
  default = []
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["eu-central-1a"]
}

variable "create_nat_gateway" {
    description = "Create a NAT gateway for the private subnets"
    type        = bool
    default     = false
}
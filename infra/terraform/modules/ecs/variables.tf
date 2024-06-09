variable "region" {
  description = "The AWS region to deploy in"
  type        = string
}

variable "docker_image" {
  description = "The Docker image for the mini-app"
  type        = string
}

variable "subnets" {
  description = "List of subnets for the ECS service"
  type        = list(string)
}

variable "security_groups" {
  description = "List of security groups for the ECS service"
  type        = list(string)
}

variable "name" {
  description = "The name of the ECS service"
  type        = string
  default     = "rename-me"
}

variable "environment_variables" {
  description = "Environment variables for the ECS service"
  type        = map(string)
  default     = {}
}
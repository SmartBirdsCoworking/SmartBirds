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

variable "assign_public_ip" {
    description = "Whether to assign a public IP to the ECS service"
    type        = bool
    default     = false
}

variable "task_name" {
    description = "The name of the ECS task"
    type        = string
    default     = "rename-me"
}

variable "ecs_execution_role" {
    description = "The ARN of the ECS execution role"
    type        = string
}

variable "cloudwatch_group_name" {
    description = "The name of the CloudWatch log group"
    type        = string
}

variable "aws_ecs_cluster_id" {
    description = "The ID of the ECS cluster"
    type        = string
}

variable "port" {
    description = "The port the ecs container listens on"
    type        = number
    default     = 80
}

variable "cpu" {
    description = "The amount of CPU to allocate to the ECS task"
    type        = string
    default     = "256"
}

variable "memory" {
    description = "The amount of memory to allocate to the ECS task"
    type        = string
    default     = "512"
}
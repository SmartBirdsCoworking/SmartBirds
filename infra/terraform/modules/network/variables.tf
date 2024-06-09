variable "cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
}

variable "name" {
  description = "Name for the network resources"
  type        = string
}

variable "create_nat_gateway" {
  description = "Create a NAT Gateway for the private subnets"
  type        = bool
  default     = true
}
variable "function_name" {
  description = "The name of the Lambda function"
}

variable "environment_variables" {
  default = ""
}

variable "handler" {
  default = ""
}
variable "runtime" {
  default = ""
}

variable "source_code_path" {}
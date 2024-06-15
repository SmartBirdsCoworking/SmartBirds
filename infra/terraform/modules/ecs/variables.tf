variable "name" {
}

variable "ecr_repos" {
    type = list(string)
    default = [
        "smartbirds-dev",
        "smartbirds-api-dev",
        "smartbirds-miniapp-dev"
    ]
}
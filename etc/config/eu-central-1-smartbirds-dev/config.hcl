vpc_cidr_block        = "10.0.0.0/16"
vpc_name              = "smartbirds-dev"
public_subnets_count  = 2
public_subnets_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
dynamodb_table_name   = "smartbirds-dev"
dynamodb_hash_key     = "ID"
dynamodb_hash_key_type = "S"
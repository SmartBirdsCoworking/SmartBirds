output "ecr_repo_urls" {
    value = aws_ecr_repository.ecr_repo[*]
}

output "cloudwatch_log_group_name" {
  value = aws_cloudwatch_log_group.ecs_logs.name
}

output "ecs_execution_role_arn" {
  value = aws_iam_role.ecs_execution_role.arn
}

output "ecs_cluster_id" {
  value = aws_ecs_cluster.ecs_cluster.id
}
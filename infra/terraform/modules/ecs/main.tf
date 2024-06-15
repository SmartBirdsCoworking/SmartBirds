resource "aws_ecr_repository" "ecr_repo" {
  for_each = toset(var.ecr_repos)
  name                 = each.key
  image_tag_mutability = "MUTABLE"

  # Optional: Enable image scanning on push to detect vulnerabilities
  image_scanning_configuration {
    scan_on_push = false
  }

  force_delete = true
}

data "aws_iam_policy_document" "ecr_repo" {
    statement {
    sid    = "ecr_repo policy"
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["809375318950"]
    }

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeRepositories",
      "ecr:GetRepositoryPolicy",
      "ecr:ListImages",
      "ecr:DeleteRepository",
      "ecr:BatchDeleteImage",
      "ecr:SetRepositoryPolicy",
      "ecr:DeleteRepositoryPolicy",
    ]
  }
}

resource "aws_ecr_repository_policy" "ecr_repo" {
  for_each = toset(var.ecr_repos)
  repository = aws_ecr_repository.ecr_repo[each.key].name
  policy     = data.aws_iam_policy_document.ecr_repo.json
}

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name = "/ecs/${var.name}"
  retention_in_days = 1 # Optional: Configure log retention policy
}

resource "aws_iam_role" "ecs_execution_role" {
  name = "ecs_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess",
    "arn:aws:iam::aws:policy/AmazonECS_FullAccess",
    "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
  ]

}

resource "aws_iam_role_policy_attachment" "secrets_manager_access" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
}

resource "aws_iam_role_policy_attachment" "ecs_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = var.name
}

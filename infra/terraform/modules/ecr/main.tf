resource "aws_ecr_repository" "ecr_repo" {
  name                 = "${var.name}"
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
  repository = aws_ecr_repository.ecr_repo.name
  policy     = data.aws_iam_policy_document.ecr_repo.json
}
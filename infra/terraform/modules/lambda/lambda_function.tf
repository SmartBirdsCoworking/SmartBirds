resource "aws_s3_bucket" "lambda_code" {
  bucket = "my-lambda-deployments"
  # Рекомендуется добавить конфигурацию для управления жизненным циклом бакета, если это необходимо
}

resource "null_resource" "lambda_zip" {
  triggers = {
    source_code_hash = filebase64sha256(var.source_code_path)
  }

  provisioner "local-exec" {
    command = "zip -j ${path.module}/${var.function_name}.zip ${var.source_code_path}"
  }

  provisioner "local-exec" {
    when    = destroy
    command = "rm -f ${path.module}/${var.function_name}.zip"
  }
}

resource "aws_s3_object" "lambda_code_object" {
  bucket = aws_s3_bucket.lambda_code.bucket
  key    = "${var.function_name}.zip"
  source = "${path.module}/${var.function_name}.zip"

  depends_on = [null_resource.lambda_zip]
}

resource "aws_lambda_function" "this" {
  function_name = var.function_name
  handler       = var.handler
  runtime       = var.runtime
  role          = aws_iam_role.this.arn

  s3_bucket = aws_s3_bucket.lambda_code.bucket
  s3_key    = aws_s3_object.lambda_code_object.key

  environment {
    variables = var.environment_variables
  }
}

resource "aws_iam_role" "this" {
  name = "${var.function_name}_role"

  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
      {
        "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : "arn:aws:logs:*:*:*"
      }
    ]
  })
}
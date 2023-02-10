# aws_lambda_function.art_api_lambda:
resource "aws_lambda_function" "art_api_lambda" {
  architectures = [
    "x86_64",
  ]
  function_name                  = "art-api"
  handler                        = "index.handler"
  filename                       = "art_api_function_payload.zip"
  layers                         = []
  memory_size                    = 128
  package_type                   = "Zip"
  reserved_concurrent_executions = -1
  role                           = "arn:aws:iam::687391720917:role/service-role/art-dynamo-access"
  runtime                        = "nodejs18.x"

  tags = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }

  timeout = 3
  environment {
    variables = {
      "TABLE_NAME"  = "ArtByLocationTable"
      "BUCKET_NAME" = "art-by-location-bucket"
      "REGION"      = "us-west-1"
    }
  }

  ephemeral_storage {
    size = 512
  }

  timeouts {}

  tracing_config {
    mode = "PassThrough"
  }
}

# aws_iam_role.iam_role_lambda:
resource "aws_iam_role" "iam_role_lambda" {

  assume_role_policy = jsonencode(
    {
      Statement = [
        {
          Action = "sts:AssumeRole"
          Effect = "Allow"
          Principal = {
            Service = "lambda.amazonaws.com"
          }
        },
      ]
      Version = "2012-10-17"
    }
  )

  force_detach_policies = false

  managed_policy_arns = [
    "arn:aws:iam::687391720917:policy/S3ReadForPresignedUrl",
    "arn:aws:iam::687391720917:policy/service-role/AWSLambdaBasicExecutionRole-93778c94-da04-4f37-afe8-67e1fa13ff3d",
    "arn:aws:iam::687391720917:policy/service-role/AWSLambdaMicroserviceExecutionRole-c6a595ac-d3f2-4bc7-a13d-8b1029ced193",
  ]
  max_session_duration = 3600
  name                 = "art-dynamo-access"
  path                 = "/service-role/"
  tags                 = {}
  tags_all             = {}

}

# aws_iam_policy.iam_lambda_basic_exec:
resource "aws_iam_policy" "iam_lambda_basic_exec" {
  name = "AWSLambdaBasicExecutionRole-93778c94-da04-4f37-afe8-67e1fa13ff3d"
  path = "/service-role/"
  policy = jsonencode(
    {
      Statement = [
        {
          Action   = "logs:CreateLogGroup"
          Effect   = "Allow"
          Resource = "arn:aws:logs:us-west-1:687391720917:*"
        },
        {
          Action = [
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ]
          Effect = "Allow"
          Resource = [
            "arn:aws:logs:us-west-1:687391720917:log-group:/aws/lambda/art-api:*",
          ]
        },
      ]
      Version = "2012-10-17"
    }
  )

  tags     = {}
  tags_all = {}
}

# aws_iam_policy.iam_lambda_microservices_exec:
resource "aws_iam_policy" "iam_lambda_microservices_exec" {
  name = "AWSLambdaMicroserviceExecutionRole-c6a595ac-d3f2-4bc7-a13d-8b1029ced193"
  path = "/service-role/"
  policy = jsonencode(
    {
      Statement = [
        {
          Action = [
            "dynamodb:DeleteItem",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:Scan",
            "dynamodb:UpdateItem",
          ]
          Effect   = "Allow"
          Resource = "arn:aws:dynamodb:us-west-1:687391720917:table/*"
        },
      ]
      Version = "2012-10-17"
    }
  )

  tags     = {}
  tags_all = {}
}

# aws_iam_policy.iam_lambda_s3_read:
resource "aws_iam_policy" "iam_lambda_s3_read" {
  description = "s3 read perms to generate presigned urls in lambda"
  name        = "S3ReadForPresignedUrl"
  path        = "/"
  policy = jsonencode(
    {
      Statement = [
        {
          Action = [
            "s3:GetObject",
          ]
          Effect   = "Allow"
          Resource = "*"
        },
      ]
      Version = "2012-10-17"
    }
  )

  tags     = {}
  tags_all = {}
}


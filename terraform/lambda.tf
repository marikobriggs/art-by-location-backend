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
  # role                           = "arn:aws:iam::687391720917:role/service-role/art-dynamo-access"
  role    = aws_iam_role.iam_role_lambda.arn
  runtime = "nodejs18.x"

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
    "${aws_iam_policy.iam_lambda_s3_read.arn}",
    "${aws_iam_policy.iam_lambda_basic_exec.arn}",
    "${aws_iam_policy.iam_lambda_microservices_exec.arn}",
    # "arn:aws:iam::687391720917:policy/S3ReadForPresignedUrl",
    # "arn:aws:iam::687391720917:policy/service-role/AWSLambdaBasicExecutionRole-93778c94-da04-4f37-afe8-67e1fa13ff3d",
    # "arn:aws:iam::687391720917:policy/service-role/AWSLambdaMicroserviceExecutionRole-c6a595ac-d3f2-4bc7-a13d-8b1029ced193",
  ]
  max_session_duration = 3600
  name                 = "art-dynamo-access"
  path                 = "/service-role/"
  tags                 = {}
  tags_all             = {}

}

# aws_iam_policy.iam_lambda_basic_exec:
resource "aws_iam_policy" "iam_lambda_basic_exec" {
  name = "ArtAPI-AWSLambdaBasicExecutionRole"
  path = "/service-role/"
  policy = jsonencode(
    {
      Statement = [
        {
          Action = "logs:CreateLogGroup"
          Effect = "Allow"
          # Resource = "arn:aws:logs:us-west-1:687391720917:*"
          Resource = "arn:aws:logs:${var.region}:${var.account_id}:*"
        },
        {
          Action = [
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ]
          Effect = "Allow"
          Resource = [
            "arn:aws:logs:${var.region}:${var.account_id}:log-group:/aws/lambda/art-api:*",
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
  name = "ArtAPI-AWSLambdaMicroserviceExecutionRole"
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
  name        = "ArtAPI-S3ReadForPresignedUrl"
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

# resource "aws_iam_policy" "iam_execute_lambda" {
#   name = "ArtAPI-ExecuteLambdaFromGateway"
#   path = "/"
#   policy = jsonencode(

#   )
# }


# {
#   "StatementId": "f74626ff-7ca4-5c98-a98b-a81f7f27df00",
#   "Action": "lambda:InvokeFunction",
#   "FunctionName": "arn:aws:lambda:us-west-1:687391720917:function:art-api:$LATEST",
#   "Principal": "apigateway.amazonaws.com",
#   "SourceArn": "arn:aws:execute-api:us-west-1:687391720917:yzg3dd72pg/*/*/items/{CountryName}"
# }

resource "aws_lambda_permission" "execute_lambda_from_gateway" {
  statement_id = "AllowExecutionFromAPIGateway"
  action       = "lambda:InvokeFunction"
  # function_name = aws_lambda_function.art_api_lambda.function_name
  function_name = aws_lambda_function.art_api_lambda.arn
  principal     = "apigateway.amazonaws.com"

  # source_arn = "arn:aws:apigateway:${var.region}::/apis/${aws_apigatewayv2_api.art_api.id}/*/*"
  # source_arn = "arn:aws:execute-api:us-west-1:${var.account_id}:${aws_apigatewayv2_api.art_api.id}/*/*"
  # source_arn = "arn:aws:execute-api:us-west-1:${var.account_id}:${aws_apigatewayv2_api.art_api.id}/"
  # source_arn = "${aws_apigatewayv2_stage.art_api_default_stage.execution_arn}/*/GET/${aws_apigatewayv2_route.art_api_get.route_key}"
  # source_arn = "arn:aws:execute-api:us-west-1:687391720917:yzg3dd72pg/*/*/items/{CountryName}"
  # source_arn = "arn:aws:execute-api:us-west-1:687391720917:${aws_apigatewayv2_api.art_api.id}/items/{CountryName}"
  # source_arn = "arn:aws:execute-api:us-west-1:687391720917:${aws_apigatewayv2_api.art_api.id}/*/*/${aws_lambda_function.art_api_lambda.function_name}"
  source_arn = "arn:aws:execute-api:us-west-1:687391720917:${aws_apigatewayv2_api.art_api.id}/*/*/items/{CountryName}"
}



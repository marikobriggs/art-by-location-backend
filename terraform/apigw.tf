# aws_apigatewayv2_api.art_api:
resource "aws_apigatewayv2_api" "art_api" {
  api_key_selection_expression = "$request.header.x-api-key"
  disable_execute_api_endpoint = false
  name                         = "art-api"
  protocol_type                = "HTTP"
  route_selection_expression   = "$request.method $request.path"
  tags = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }

  cors_configuration {
    allow_credentials = false
    allow_headers = [
      "content-type",
    ]
    allow_methods = [
      "GET",
    ]
    allow_origins = [
      "*",
    ]
    expose_headers = []
    max_age        = 0
  }
}

# aws_apigatewayv2_stage.art_api_default_stage:
resource "aws_apigatewayv2_stage" "art_api_default_stage" {
  api_id      = aws_apigatewayv2_api.art_api.id
  auto_deploy = true
  name        = "main"
  tags = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }

  default_route_settings {
    data_trace_enabled       = false
    detailed_metrics_enabled = false
    throttling_burst_limit   = 1000
    throttling_rate_limit    = 1000
  }
}

# aws_apigatewayv2_integration.art_api_lambda_integration:
resource "aws_apigatewayv2_integration" "art_api_lambda_integration" {
  api_id                 = aws_apigatewayv2_api.art_api.id
  connection_type        = "INTERNET"
  integration_method     = "POST"
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.art_api_lambda.invoke_arn
  payload_format_version = "2.0"
  timeout_milliseconds   = 30000
}

# aws_apigatewayv2_route.art_api_get:
resource "aws_apigatewayv2_route" "art_api_get" {
  api_id               = aws_apigatewayv2_api.art_api.id
  api_key_required     = false
  authorization_scopes = []
  authorization_type   = "NONE"
  request_models       = {}
  route_key            = "GET /items/{CountryName}"
  target               = "integrations/${aws_apigatewayv2_integration.art_api_lambda_integration.id}"
}

# provisioner "local-exec" {
#   command = ""

# }

output "apigw_default_state_name" {
  value = aws_apigatewayv2_stage.art_api_default_stage.name
}

output "apigw_api_id" {
  value = aws_apigatewayv2_api.art_api.id
}
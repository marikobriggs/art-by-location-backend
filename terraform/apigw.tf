# aws_apigatewayv2_api.art_api:
resource "aws_apigatewayv2_api" "art_api" {
  api_key_selection_expression = "$request.header.x-api-key"
  disable_execute_api_endpoint = false
  name                         = "art-api"
  protocol_type                = "HTTP"
  route_selection_expression   = "$request.method $request.path"
  # tags                         = {}

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
  tags        = {}
  tags_all    = {}

  default_route_settings {
    data_trace_enabled       = false
    detailed_metrics_enabled = false
    throttling_burst_limit   = 1000
    throttling_rate_limit    = 1000
  }
}

# aws_apigatewayv2_integration.art_api_lambda_integration:
resource "aws_apigatewayv2_integration" "art_api_lambda_integration" {
  api_id             = aws_apigatewayv2_api.art_api.id
  connection_type    = "INTERNET"
  integration_method = "POST"
  integration_type   = "AWS_PROXY"
  # integration_uri        = "arn:aws:lambda:us-west-1:687391720917:function:art-api"
  integration_uri        = aws_lambda_function.art_api_lambda.invoke_arn
  # integration_uri        = aws_lambda_function.art_api_lambda.qualified_invoke_arn
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
  # route_key = "/items/{CountryName}"
  target = "integrations/${aws_apigatewayv2_integration.art_api_lambda_integration.id}"
}


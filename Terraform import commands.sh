# Terraform import commands 


# apigw 
terraform import aws_apigatewayv2_integration.art_api_lambda_integration glusk0c208/tutao7q

terraform import aws_apigatewayv2_route.art_api_get glusk0c208/isev6aa

terraform import aws_apigatewayv2_stage.art_api_default_stage glusk0c208/main

terraform import aws_apigatewayv2_api.art_api glusk0c208

# dynamo 
terraform import aws_dynamodb_table.art_api_dynamo ArtByLocationTable

# s3 
terraform import aws_s3_bucket.art_api_bucket art-by-location-bucket 

terraform import aws_s3_object.s3_canada art-by-location-bucket/canada.jpeg
terraform import aws_s3_object.s3_france art-by-location-bucket/france.jpeg
terraform import aws_s3_object.s3_netherlands art-by-location-bucket/netherlands.jpeg
terraform import aws_s3_object.s3_poland art-by-location-bucket/poland.jpeg
terraform import aws_s3_object.s3_united_states art-by-location-bucket/united-states.jpeg


# lambda 
terraform import aws_lambda_function.art_api_lambda art-api

terraform import aws_lambda_permission.execute_lambda_from_gateway art-api/AllowExecutionFromAPIGateway

# iam 
terraform import aws_iam_role.iam_role_lambda art-dynamo-access

# TODO: import policies 
terraform import aws_iam_policy.iam_lambda_basic_exec arn:aws:iam::687391720917:policy/service-role/AWSLambdaBasicExecutionRole-93778c94-da04-4f37-afe8-67e1fa13ff3d
terraform import aws_iam_policy.iam_lambda_microservices_exec arn:aws:iam::687391720917:policy/service-role/AWSLambdaMicroserviceExecutionRole-c6a595ac-d3f2-4bc7-a13d-8b1029ced193
terraform import aws_iam_policy.iam_lambda_s3_read arn:aws:iam::687391720917:policy/S3ReadForPresignedUrl

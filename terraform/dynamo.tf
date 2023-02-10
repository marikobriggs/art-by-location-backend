# aws_dynamodb_table.art_api_dynamo:
resource "aws_dynamodb_table" "art_api_dynamo" {
  billing_mode   = "PROVISIONED"
  hash_key       = "CountryName"
  name           = "ArtByLocationTable"
  read_capacity  = 1
  stream_enabled = false
  tags = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }
  tags_all = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }
  write_capacity = 1

  attribute {
    name = "CountryName"
    type = "S"
  }

  attribute {
    name = "ObjectName"
    type = "S" 
  }

  point_in_time_recovery {
    enabled = false
  }

  timeouts {}


}
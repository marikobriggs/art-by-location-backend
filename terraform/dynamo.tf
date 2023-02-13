# locals {
#   json_data = file("./dynamo_data.json")
#   tf_data   = jsondecode(local.json_data)
# }

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

  point_in_time_recovery {
    enabled = false
  }

  timeouts {}
}

#TODO: update to create these via for each and json file 
# resource "aws_dynamodb_table_item" "art_table_item" {
#   for_each   = local.tf_data
#   table_name = aws_dynamodb_table.art_api_dynamo.name
#   hash_key   = aws_dynamodb_table.art_api_dynamo.hash_key
#   item       = jsonencode(each.value.ObjectName)
# }

resource "aws_dynamodb_table_item" "dynamo_canada_item" {
  table_name = aws_dynamodb_table.art_api_dynamo.name
  hash_key   = aws_dynamodb_table.art_api_dynamo.hash_key

  item = jsonencode({
    "CountryName" : {
      "S" : "canada"
    },
    "ObjectName" : {
      "S" : "canada.jpeg"
    },
  })
}

resource "aws_dynamodb_table_item" "dynamo_france_item" {
  table_name = aws_dynamodb_table.art_api_dynamo.name
  hash_key   = aws_dynamodb_table.art_api_dynamo.hash_key

  item = jsonencode({
    "CountryName" : {
      "S" : "france"
    },
    "ObjectName" : {
      "S" : "france.jpeg"
    },
  })
}

resource "aws_dynamodb_table_item" "dynamo_netherlands_item" {
  table_name = aws_dynamodb_table.art_api_dynamo.name
  hash_key   = aws_dynamodb_table.art_api_dynamo.hash_key

  item = jsonencode({
    "CountryName" : {
      "S" : "netherlands"
    },
    "ObjectName" : {
      "S" : "netherlands.jpeg"
    },
  })
}

resource "aws_dynamodb_table_item" "dynamo_poland_item" {
  table_name = aws_dynamodb_table.art_api_dynamo.name
  hash_key   = aws_dynamodb_table.art_api_dynamo.hash_key

  item = jsonencode({
    "CountryName" : {
      "S" : "poland"
    },
    "ObjectName" : {
      "S" : "poland.jpeg"
    },
  })
}

resource "aws_dynamodb_table_item" "dynamo_unitedstates_item" {
  table_name = aws_dynamodb_table.art_api_dynamo.name
  hash_key   = aws_dynamodb_table.art_api_dynamo.hash_key

  item = jsonencode({
    "CountryName" : {
      "S" : "united-states"
    },
    "ObjectName" : {
      "S" : "united-states.jpeg"
    },
  })
}
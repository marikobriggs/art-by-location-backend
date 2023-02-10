# aws_s3_bucket.art_api_bucket:
resource "aws_s3_bucket" "art_api_bucket" {
  bucket              = "art-by-location-bucket"
  object_lock_enabled = false
  request_payer       = "BucketOwner"
  tags = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }
  tags_all = {
    "CreatorName" = "mariko.briggs@slalom.com"
  }

  grant {
    id = "8000dfc982229d33936dac288c202fccc25bde29998000e8083b5ba2ea1c1182"
    permissions = [
      "FULL_CONTROL",
    ]
    type = "CanonicalUser"
  }

  server_side_encryption_configuration {
    rule {
      bucket_key_enabled = true

      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  timeouts {}

  versioning {
    enabled    = false
    mfa_delete = false
  }
}

# aws_s3_object.s3_canada:
resource "aws_s3_object" "s3_canada" {
  bucket                 = "art-by-location-bucket"
  source                 = "images/canada.jpeg"
  bucket_key_enabled     = false
  content_type           = "image/jpeg"
  key                    = "canada.jpeg"
  metadata               = {}
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
  tags                   = {}
}

# aws_s3_object.s3_france:
resource "aws_s3_object" "s3_france" {
  bucket                 = "art-by-location-bucket"
  source                 = "images/france.jpeg"
  bucket_key_enabled     = false
  content_type           = "image/jpeg"
  key                    = "france.jpeg"
  metadata               = {}
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
  tags                   = {}
}

# aws_s3_object.s3_netherlands:
resource "aws_s3_object" "s3_netherlands" {
  bucket                 = "art-by-location-bucket"
  source                 = "images/netherlands.jpeg"
  bucket_key_enabled     = false
  content_type           = "image/jpeg"
  key                    = "netherlands.jpeg"
  metadata               = {}
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
  tags                   = {}
}

# aws_s3_object.s3_poland:
resource "aws_s3_object" "s3_poland" {
  bucket                 = "art-by-location-bucket"
  source                 = "images/poland.jpeg"
  bucket_key_enabled     = false
  content_type           = "image/jpeg"
  key                    = "poland.jpeg"
  metadata               = {}
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
  tags                   = {}
}

# aws_s3_object.s3_united_states:
resource "aws_s3_object" "s3_united_states" {
  bucket                 = "art-by-location-bucket"
  source                 = "images/united-states.jpeg"
  bucket_key_enabled     = false
  content_type           = "image/jpeg"
  key                    = "united-states.jpeg"
  metadata               = {}
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
  tags                   = {}
}
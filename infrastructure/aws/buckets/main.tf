terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.9.0"
    }
  }

#   backend "s3" {
#     bucket = "timetracker-stage-frontend-bucket-state"
#     key    = "timetracker-bucket/terraform.tfstate"
#     region = "us-east-1"
#   }

}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "timetracker-stage-frontend-bucket-state" {
  bucket = var.timetracker-stage-frontend-bucket-state
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "bucket-timetracker-state-versioning" {
  bucket = aws_s3_bucket.timetracker-stage-frontend-bucket-state.id
  versioning_configuration {
    status = "Enabled"
  }
}
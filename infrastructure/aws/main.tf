provider "aws" {
  region = "us-east-1"
}

module "timetracker-files-s3" {
  source                = "git@github.com:ioet/infra-terraform-modules.git//aws-static-website"
  create_route53_domain = false
  bucket_name           = var.bucket_name
  zone_name             = var.zone_name
  website_domain        = var.domain_name
}

# Enable when launch to PROD files are ready
# module "static-website-people-prod" {
#   source                = var.repo_source
#   create_route53_domain = true
#   bucket_name           = var.bucket_name
#   zone_name             = var.zone_name
#   website_domain        = var.domain_name
# }

resource "null_resource" "upload-files" {
  provisioner "local-exec" {
    command     = "aws s3 sync ../build/ s3://${var.bucket_name} --delete"
    interpreter = ["/bin/bash", "-c"]
  }
}
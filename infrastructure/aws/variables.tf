variable "environment" {
  default = "stage"
}

variable "repo_source" {
  default = "git@github.com:ioet/infra-terraform-modules.git//aws-static-website"
}

variable "zone_name" {
  default = "timetracker.ioet.com"
}

variable "bucket_name" {
  default = "timetracker-stage-frontend-bucket-state"
}

variable "domain_name" {
  default = "stg2.timetracker.ioet.com"
}

variable "timetracker-stage-frontend-bucket-state" {
  type    = string
  default = "timetarcker-stage-frontend-bucket-state"
}